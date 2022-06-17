import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ResponseModel } from '../../../share/response';
import { ReqEntity, DTOReq } from '../entities/req.entity';
import { DictService } from '../../dict/service/index.service';

import * as os from 'os'
import * as path from 'path'
import { fork } from 'child_process'
import * as fs from 'fs'
import { CONFIG } from '../../../config';

@Injectable()
export class ReqService {
	private cache: Record<string, number> = {}

	constructor(
		@InjectRepository(ReqEntity)
		private readonly entity: Repository<ReqEntity>,

		private readonly dictService: DictService
	) {
	}

	public async post(data: DTOReq): Promise<ResponseModel> {
		const responseModel = new ResponseModel();
		try {
			const e = this.entity.create({
				url: data.url,method: data.method,body: data.body,
				bodyDict: JSON.stringify(data.bodyDict),bodyParser: data.bodyParser
			}) ;
			const r = await this.entity.insert(e)
			const id = r.raw.insertId
			this.createReqTask(data)
			return responseModel.setCode(HttpStatus.OK).setData(id.toString())
		} catch (e) {
			return responseModel.setCode(HttpStatus.INTERNAL_SERVER_ERROR)
				.setData({
					error: 'interval_server_error',
					error_description: e,
				});
		}
	}

	private async createReqTask(e: DTOReq) {
		// const cpus = os.cpus()
		// const len = cpus.length
		// console.log(e)
		// const child = fork(path.resolve(__dirname, './req.child'))
		// child.on('message' , e => { console.log(e) })
		// child.send({ hello: 'world' })
		const dict = {}
		for(let key in e.bodyDict) {
			const dictId = e.bodyDict[key]
			const filePath = await this.dictService.getById(dictId)
			const p = path.join(CONFIG.dir,'../public/files/dict', filePath.path)
			const result = fs.readFileSync(p, 'utf-8').split('\r\n')
			dict[key] = result
		}

		const bodyPara = e.body.split('&')
		let data ;

		const setBody = ( k: string , v: any ) => {
			if( e.contentType === 'json') {
				if( !data ) {
					data = { [k] : v }
				} else {
					data[k] = v
				}
			}
			if( e.contentType === 'formdata') {
				if( !data) data = new FormData()
				data.append(k,v)
			}
		}

		const keys = {}
		bodyPara.forEach( i => {
			const reg = /(\w+)=((\$?{?)?\w+(})?)/gi
			const result = reg.exec(i)
			const key = result[1]
			const val = result[2]
			if(/\${\w+}/gi.test(val)) {
				const v =  /\${(\w+)}/gi.exec(val)[1]
				keys[v] = key
			} else {
				setBody(key,val)
			}
		})

		console.log(keys)
		console.log(dict)
		for(let key in dict ) {
			const config = dict[key]
			const filed = keys[key]
			// console.log(filed)
		}
	}
}
