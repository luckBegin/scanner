import { Scanner, ScannerOutputType, ScannerRunStatus, ScannerType } from "./base";
import { DomainScanner } from "./domain";
import {DirScanner} from "./dir";

export * from "./base";
export * from "./domain";

export class ScannerManage {
	static scannerList: Record<string, Scanner> = {};
	static List: Record<string, () => Scanner> = {
		[ScannerType.DOMAIN]: () => new DomainScanner(),
		[ScannerType.DIR]: () => new DirScanner()
	};

	static async Run(type: ScannerType, q: Record<string, any>): Promise<ScannerRunStatus> {
		if( !(type in ScannerManage.List) ) return new ScannerRunStatus().markAsFail('扫描器不存在')
		const scanner = ScannerManage.List[type]();
		const result = await scanner.run(q)
		if( result.success ) {
			const id = scanner.id
			ScannerManage.scannerList[id] = scanner
			result.scanner.$output.subscribe( r => {
				if(
					r.type === ScannerOutputType.COMPLETE ||
					r.type === ScannerOutputType.ERROR
				) {
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
