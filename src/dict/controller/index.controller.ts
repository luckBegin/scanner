import { Body, Controller, Delete, Get, Param, Post, Query, Res, UploadedFile, UseInterceptors } from "@nestjs/common";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { Dict } from "../entity/index.entity";
import { Response } from "../../common";
import { DictFileVo, DictListQuery } from "../dto";
import { DictService, ListRes } from "../service/index.service";
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
	@Get('')
	@ApiResponse({description:'查询列表' , type: Array< Dict > })
	async list (
		@Query() q: DictListQuery,
		@Res() res
	): Promise< Response< ListRes >> {
		const r = await this.service.list(new DictListQuery(q) )
		return res.status(r.code).json(r)
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
		@Body() body: any,
		@Res() res
	) {
		const r = await this.service.create(body, file)
		return res.status(r.code).json(r)
	}

	@Get(':id')
	@ApiResponse({description:'查询列表' , type: Array< Dict > })
	async getFile (
		@Param('id') id: number,
		@Res() res
	): Promise< Response< DictFileVo >> {
		const r = await this.service.getFileById(id)
		return res.status(r.code).json(r)
	}

	@Delete(':id')
	async delete(
		@Param("id") id: number,
		@Res() res
	): Promise< Response< null > > {
		const r = await this.service.del(id)
		return res.status(r.code).json(r)
	}
}
