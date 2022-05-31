import {
	Get,
	Post,
	Controller,
	Res,
	Query,
	Body,
	UseInterceptors,
	Delete,
	Param, Put,
} from '@nestjs/common';
import { ApiResponse, ApiTags, ApiOperation } from '@nestjs/swagger' ;
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { DTODict, QDict } from '../entities/dict.entity';
import * as md5 from 'md5';
import { DictService } from '../service/index.service';

const urlPrefix: string = 'dict';

@ApiTags('字典控制器')
@Controller()
export class DictController {
	constructor(
		private readonly service: DictService,
	) {
	}

	@Post(urlPrefix)
	@ApiResponse({ status: 200, description: '成功' })
	@ApiOperation({ summary: '新增字典' })
	@UseInterceptors(FileInterceptor('file', {
		storage: diskStorage({
			destination: (data, file, cb) => {
				const map = { 1: 'username', 2: 'password', 3: 'path' };
				data.body.path = map[data.body.type]
				cb(null, './public/files/dict/' + map[data.body.type]);
			},
			filename: (data, file, cb) => {
				const { type } = data.body;
				const name = md5(type + Date.now() + file.originName) + '.txt';
				data.body.path = data.body.path + '/' + name;
				cb(null, `${name}`);
			},
		}),
	}))
	async post(
		@Res() res,
		@Body() body: DTODict,
	) {
		const response = await this.service.post(body)
		return res.status(response.code).send(response.data);
	}

	@Get(urlPrefix)
	async get(
		@Res() res,
		@Query() query: QDict
	) {
		const response = await this.service.get(query)
		return res.status(response.code).send(response.data);
	}

	@Delete(urlPrefix + '/:id')
	async delete(
		@Res() res,
		@Param('id') id: string
	) {
		const response = await this.service.delete(id)
		return res.status(response.code).send(response.data);
	}

	@Put(urlPrefix)
	async put(
		@Res() res,
		@Body() body: DTODict,
	) {
		const response = await this.service.put(body)
		return res.status(response.code).send(response.data);
	}
}
