import {Subject} from "rxjs";
import {ChildProcess, fork} from "child_process";
import * as OS from "os";
import {join} from "path";
import {Config} from "../../common/config";
import {InputEventType, OutputEvent, OutputEventType} from "./worker-event";
import {DictService} from "../../dict/service/index.service";
import {getApp} from "../../main";

export enum ScannerOutputType{
	UPLOAD,
	ERROR,
	COMPLETE
}
export interface ScannerOutput {
	type: ScannerOutputType ,
	data?: {
		success: boolean,
		message: string,
		[key: string]: any
	}
}
interface ScannerConstructor {
	new(): Scanner;
}
export enum ScannerType {
	"DOMAIN"="DOMAIN",
	"DIR"="DIR",
	"PARAMETER"="PARAMETER",
}

export type IScannerRunStatus = { success: boolean, message: string, data: Record<string, any>, id: string }
export class ScannerRunStatus implements IScannerRunStatus{
	data: Record<string, any>;
	id: string;
	message: string;
	success: boolean;
	scanner: Scanner
	build () {
		return new ScannerRunStatus()
	}

	setScanner(s: Scanner): this {
		this.scanner = s
		return this ;
	}
	setId(id: string): this {
		this.id = id ;
		return this
	}

	setMessage(m:string):this{
		this.message = m
		return this
	}

	markAsSuccess():this {
		this.success = true
		return this ;
	}

	markAsFail(m: string = ''): this {
		this.success = false
		this.message = m
		return this;
	}
}

export abstract class Scanner {
	public $output = new Subject<ScannerOutput>();
	public process: Array<ChildProcess> = [];
	public id = this.generateId() ;

	private generateId (): string {
		const random = Math.random().toString(16)
		return `Task_${random.substring(2,10)}` ;
	}

	public terminate() {
		this.process.forEach(i => i.kill());
	}


	private thread = OS.cpus().length
	private dictService: DictService = getApp().get(DictService)

	protected abstract workerPath: string
	public async run(q: Record<string, any>): Promise< ScannerRunStatus > {
		const { target, thread, dict } = q ;
		const r = new ScannerRunStatus()
		if( !target ) return r.markAsFail('目标不存在')
		if( !dict ) return r.markAsFail('字典不存在')
		if( thread ) this.thread = thread
		const dictResult = await this.dictService.getFileByIds(dict)
		if( !dictResult.success ) return r.markAsFail(dictResult.message) ;
		const dictArr = dictResult.data.map( i => i.result );

		for( let i = 0 ; i < this.thread ; i ++ ) {
			this.process.push(this.createWorker(target,dictArr.flat(), q))
		}
		return r.markAsSuccess().setId(this.id).setScanner(this)
	}

	protected createWorker(target:string, dictArr: Array<string>, q: Record<string, any>): ChildProcess {
		const path = join(Config.baseDir, this.workerPath)
		const worker = fork(path,[`-domain=${target}`, `-id=${this.id}`])
		const sendTask = () => {
			if( !dictArr.length ) {
				worker.kill()
				this.thread --
				if( !this.thread ) {
					this.$output.next({ type: ScannerOutputType.COMPLETE })
				}
			} else {
				const data = dictArr.pop() ;
				worker.send({ type: InputEventType.update, data , para: q  })
			}
		}
		worker.on('exit', () => console.log("I'm Die")) ;
		worker.on('message' , ({type,data}: OutputEvent) => {
			sendTask()
			if( type === OutputEventType.UPDATE ) {
				this.$output.next({type: ScannerOutputType.UPLOAD, data })
			}
			if( type === OutputEventType.ERROR ) {
				this.terminate()
				this.$output.next({type: ScannerOutputType.ERROR, data })
			}
		})

		return worker
	}
}
