import {HttpStatus, Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {ResponseModel} from "../../../share/response";
import { DTODict, DictEntity, QDict, Query } from '../entities/dict.entity';
import * as fs from 'fs'
import * as path from 'path'

@Injectable()
export class DictService {
	constructor(
		@InjectRepository( DictEntity )
		private readonly entity: Repository< DictEntity >
	) {
	}

	async post( data: DTODict ) : Promise< ResponseModel > {
		const responseModel = new ResponseModel()
		try {
			const e = this.entity.create(data) ;
			await this.entity.insert(e) ;
			return responseModel.setCode(HttpStatus.NO_CONTENT)
		}catch (e) {
			return responseModel.setCode(HttpStatus.INTERNAL_SERVER_ERROR)
				.setData({
					error: "interval_server_error" ,
					error_description: e
				})
		}
	}

	async get(q: QDict): Promise< ResponseModel > {
		const responseModel = new ResponseModel()
		try {
			const qs = new Query(q) ;
			const data = await this.entity.find(qs) ;
			const count = await this.entity.count(qs) ;

			return responseModel.setCode(HttpStatus.OK)
				.setData({ data , count })

		}catch (e) {
			return responseModel.setCode(HttpStatus.INTERNAL_SERVER_ERROR)
				.setData({
					error: "interval_server_error" ,
					error_description: e
				})
		}
	}

	async delete( id: string ) : Promise< ResponseModel > {
		const responseModel = new ResponseModel() ;
		try {
			const e = await this.entity.findOneBy({id})
			if(!e) return responseModel.setCode(HttpStatus.BAD_REQUEST)
				.setData({
					error: 'bad_request' ,
					error_description: "invalid id"
				})
			fs.unlink(path.join('./public/files/dict', e.path) , err => {

			})
			await this.entity.delete({id}) ;
			return responseModel.setCode(HttpStatus.NO_CONTENT) ;
		} catch (e) {
			return responseModel.setCode(HttpStatus.INTERNAL_SERVER_ERROR)
				.setData({
					error: 'internal_server_error' ,
					error_description:e
				})
		}
	}

	async put(data: DTODict ) : Promise< ResponseModel > {
		const responseModel = new ResponseModel()
		try {
			const e = await this.entity.findOneBy({id: data.id})
			if(!e) return responseModel.setCode(HttpStatus.BAD_REQUEST)
				.setData({
					error: 'bad_request' ,
					error_description: "invalid id"
				})
			const result = await this.entity.update( data.id  , this.entity.create(data)) ;
			return responseModel.setCode(HttpStatus.NO_CONTENT) ;
		} catch (e) {
			return responseModel.setCode(HttpStatus.INTERNAL_SERVER_ERROR)
				.setData({
					error: 'internal_server_error' ,
					error_description:e
				})
		}
	}
}
