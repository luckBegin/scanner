import { Scanner } from "../base";

export class DomainScanner extends Scanner {
	constructor() {
		super();
	}
	protected workerPath = 'src/util/scanner/domain/worker.js'
}
