import { Scanner, ScannerBaseInput } from "../base";
import { ChildProcess } from "child_process";
export class DomainScanner extends Scanner {
	constructor() {
		super();
	}
	created(p: Record<string, any>): Array<ChildProcess> {
		return [];
	}

	run(q: ScannerBaseInput<string>): void {
	}

}
