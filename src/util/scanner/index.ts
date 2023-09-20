import { Scanner, ScannerType } from "./base";
import { DomainScanner } from "./domain";

export * from "./base";
export * from "./domain";

export class ScannerManage {
	static processStack: Record<string, Scanner> = {};
	static List: Record<string, () => Scanner> = {
		[ScannerType.DOMAIN]: () => new DomainScanner(),
	};

	static Run(type: ScannerType, p: Record<string, any>): string {
		const random = Math.random().toString(16).substring(2, 10);
		const id = `Task_${random}`;
		ScannerManage.processStack[id] = ScannerManage.List[type]();
		return id;
	}

	static terminate(id: string) {
		if (id in ScannerManage.processStack) {
			ScannerManage.processStack[id].terminate();
		}
	}
}
