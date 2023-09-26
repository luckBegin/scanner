import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {GET} from "../../common/decorator/request.decorator";
import {Observable} from "rxjs";
import {Response} from '../../common/model/reponse'
import {MsgService} from "../common/msg.service";
import {Config} from "../../common/config";

const api = {
	list: Config.host + '/task'
}
@Injectable()
export class DomainService {
	constructor(
		private http: HttpClient,
		private msg: MsgService
	) {
	}

	@GET(api.list)
	public list(): Observable<Response> | any {
	}
}
