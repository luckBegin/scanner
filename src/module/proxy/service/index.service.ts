import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ResponseModel } from '../../../share/response';

@Injectable()
export class ProxyService {
	constructor() {}

	async get(): Promise<ResponseModel> {
		const responseModel = new ResponseModel();
		try {
		} catch (e) {
			return responseModel
				.setCode(HttpStatus.INTERNAL_SERVER_ERROR)
				.setData({
					error: 'interval_server_error',
					error_description: e,
				});
		}
	}
}
