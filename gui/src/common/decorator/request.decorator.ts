import {getPlatform} from "@angular/core";
import {MsgService} from "../../service/common/msg.service";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {AppModule} from "../../app/app.module";
import {Observable} from "rxjs";
import {Response} from "../model/reponse";

export function GET(url:string,message='请求出错') {
	return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
		const val = descriptor.value ;
		descriptor.value = function () {
			const http = AppModule.injector.get(HttpClient)
			const msg = AppModule.injector.get(MsgService)
			return new Observable( n => {
				http.get(url)
					.subscribe( ( r: any ) => {
						if(r.code === 200 || r.code === 201 ) {
							n.next(r.data)
						} else {
							n.error(r.message)
						}
					})
			})
		}
	}
}
