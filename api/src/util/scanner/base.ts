import { Subject } from "rxjs";
import { ChildProcess } from "child_process";
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
	"DOMAIN",
	"DIR",
	"PARAMETER",
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

	public abstract run(q: Record<string, any>): Promise< ScannerRunStatus >
}
