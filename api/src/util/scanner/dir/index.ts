import { Scanner } from "../base";
export class DirScanner extends Scanner {
	constructor() {
		super();
	}
	protected workerPath =  'src/util/scanner/dir/worker.js'
}
