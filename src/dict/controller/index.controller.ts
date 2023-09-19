import { Body, Controller, Delete, Get, Param, Post, Query, UploadedFile, UseInterceptors } from "@nestjs/common";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { Dict } from "../entity/index.entity";
import { Response } from "../../common";
import { DictFileVo, DictListQuery } from "../dto";
import { DictService } from "../service/index.service";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { Config } from "../../common/config";

@ApiTags('Dict')
@Controller('dict')
export class DictController {
	constructor(
		private service: DictService ,
	) {
	}
	@Get('list')
	@ApiResponse({description:'查询列表' , type: Array< Dict > })
	async list (
		@Query() q: DictListQuery
	): Promise< Response< Array< Dict > >> {
		return this.service.list(new DictListQuery(q) )
	}

	@Post()
	@UseInterceptors(FileInterceptor('file',{
		storage: diskStorage({
			destination: Config.dictUploadDir,
			filename: (req, file, cb) => {
				cb(null, file.originalname)
			}
		}),
	}))
	async create(
		@UploadedFile() file: Express.Multer.File,
		@Body() body: any
	) {
		return this.service.create(body, file)
	}

	@Get(':id')
	@ApiResponse({description:'查询列表' , type: Array< Dict > })
	async getFile (
		@Param('id') id: number
	): Promise< Response< DictFileVo >> {
		return this.service.getFileById(id)
	}

	@Delete(':id')
	async delete(
		@Param("id") id: number
	): Promise< Response< null > > {
		return this.service.del(id)
	}
}
