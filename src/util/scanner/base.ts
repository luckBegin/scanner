import { Subject } from "rxjs";
import { ChildProcess, fork } from "child_process";
import { DomainScanner } from "./domain";

export interface ScannerOutput {

}

export interface ScannerBaseInput<T> {
	param: T,
}

interface ScannerConstructor {
	new(): Scanner;
}


export enum ScannerType {
	"DOMAIN" ,
	"DIR",
	"PARAMETER" ,
}

export abstract class Scanner {
	public $output = new Subject<ScannerOutput>();
	public process: Array<ChildProcess> = [];
	public terminate() {
		this.process.forEach(i => i.kill());
	}
	public abstract run(q: ScannerBaseInput<string>): void

	public abstract created(p: Record<string, any>): Array<ChildProcess>
}
