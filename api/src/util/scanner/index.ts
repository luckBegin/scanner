import { Scanner, ScannerOutputType, ScannerRunStatus, ScannerType } from "./base";
import { DomainScanner } from "./domain";

export * from "./base";
export * from "./domain";

export class ScannerManage {
	static scannerList: Record<string, Scanner> = {};
	static List: Record<string, () => Scanner> = {
		[ScannerType.DOMAIN]: () => new DomainScanner(),
	};

	static async Run(type: ScannerType, q: Record<string, any>): Promise<ScannerRunStatus> {
		const scanner = ScannerManage.List[type]();
		const result = await scanner.run(q)
		if( result.success ) {
			const id = scanner.id
			ScannerManage.scannerList[id] = scanner
			result.scanner.$output.subscribe( r => {
				if( r.type === ScannerOutputType.COMPLETE ) {
					delete ScannerManage.scannerList[result.id]
				}
			})
		}
		return  result
	}

	static terminate(id: string) {
		if (id in ScannerManage.scannerList) {
			ScannerManage.scannerList[id].terminate();
			delete ScannerManage.scannerList[id]
		}
	}
}
