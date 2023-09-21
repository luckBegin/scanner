import { Scanner, ScannerOutputType, ScannerRunStatus } from "../base";
import { ChildProcess, fork } from "child_process";
import * as OS from "os";
import { join } from "path";
import { DictService } from "../../../dict/service/index.service";
import { getApp } from "../../../main";
import { Config } from "../../../common/config";
import { InputEventType, OutputEvent, OutputEventType } from "../worker-event";

export class DomainScanner extends Scanner {
	private dictService: DictService = getApp().get(DictService)
	constructor() {
		super();
	}

	private thread = OS.cpus().length

	async run(q: Record<string, any>): Promise< ScannerRunStatus > {
		const { target, thread, dict } = q ;
		const r = new ScannerRunStatus()
		if( !target ) return r.markAsFail('目标不存在')
		if( !dict ) return r.markAsFail('字典不存在')
		if( thread ) this.thread = thread
		const dictResult = await this.dictService.getFileById(dict)
		if( !dictResult.success ) return r.markAsFail(dictResult.message) ;
		const dictArr = dictResult.data.map( i => i.result );
		for( let i = 0 ; i <= this.thread ; i ++ ) {
			this.process.push(this.createWorker(target,dictArr.flat()))
		}
		return r.markAsSuccess().setId(this.id).setScanner(this)
	}

	private createWorker(target:string, dictArr: Array<string>): ChildProcess {

		const path = join(Config.baseDir, 'src/util/scanner/domain/worker.js')
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
				worker.send({ type: InputEventType.update, data })
			}
		}
		worker.on('message' , ({type,data}: OutputEvent) => {
			sendTask()
			if( type === OutputEventType.UPDATE ) {
				this.$output.next({type: ScannerOutputType.UPLOAD, data })
			}
		})

		return worker
	}
}
