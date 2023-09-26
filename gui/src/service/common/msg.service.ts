import {NzMessageService} from "ng-zorro-antd/message";
import {Injectable} from "@angular/core";

@Injectable()
export class MsgService{
	constructor(
		private msg: NzMessageService
	) {
	}

	public success(m: string) {
		this.msg.success(m)
	}

	public error(m: string) {
		this.msg.error(m)
	}

	public warn(m: string){
		this.msg.warning(m)
	}
}
