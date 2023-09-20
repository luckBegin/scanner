import { Subject } from "rxjs";
import { fork } from "child_process";
import { join } from "path";
import { Config } from "../../common/config";

export interface ScannerOutput {

}

export interface ScannerBaseInput<T> {
	param: T,
}

export class Scanner {
	private $output = new Subject<ScannerOutput>();

	public run(q: ScannerBaseInput<string>) {
	}

	public output() {
	}

	static Run() {
		const path = join(Config.baseDir,'/src/util/scanner/a.js')
		const child = fork(path);
		child.on('message', function(m){
			console.log('message from child: ' + JSON.stringify(m));
		});
		child.send({from: 'parent'});
		child.on('error', e => {
			console.log(e);
		})
		child.on('close', e => {
			console.log(e);
		})
		console.log(child)
	}
}
