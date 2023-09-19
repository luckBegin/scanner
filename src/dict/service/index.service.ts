import { HttpStatus, Injectable } from "@nestjs/common";
import { Response } from "src/common/model";
import { Dict } from "../entity/index.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { DictFileVo, DictListQuery } from "../dto";
import { join } from "path";
import { readFileSync, unlinkSync } from "fs";
import { Config } from "../../common/config";

type List = Array<Dict>

@Injectable()
export class DictService {
	constructor(
		@InjectRepository(Dict)
		private entity: Repository<Dict>,
	) {
	}

	public async list(q: DictListQuery): Promise<Response<List>> {
		const r = Response.build<List>();
		try {
			const result = await this.entity.find({
				where: { type: q.type },
				skip: q.pageNumber,
				take: q.pageSize,
			});
			return r.setData(result);
		} catch (e) {
			return r.setMessage(e);
		}
	}

	public async create(data: any, file: Express.Multer.File): Promise<Response<null>> {
		const r = Response.build<undefined>();
		try {
			const entity = this.entity.create({
				name: data.name,
				type: data.type,
				fileName: file.filename,
			});
			await this.entity.insert(entity);
			return r;
		} catch (e) {
			return r.setCode(HttpStatus.INTERNAL_SERVER_ERROR).setMessage(e);
		}
	}

	public async getFileById(id: number): Promise<Response<DictFileVo>> {
		const r = Response.build<DictFileVo>();
		try {
			const entity = await this.entity.findOneBy({ id });
			if (!entity) return r.setCode(HttpStatus.BAD_REQUEST).setMessage("数据不存在");
			const path = this.getFilePath( entity.fileName)
			const result = readFileSync(path, "utf-8");
			const strArr = result.split(/\r?\n/);
			return r.setData(new DictFileVo(entity).setResult(strArr))
		} catch (e) {
			return r.setCode(HttpStatus.INTERNAL_SERVER_ERROR).setMessage(e);
		}
	}

	public async del(id: number): Promise< Response<null> > {
		const r = Response.build<null>();
		try {
			const entity = await this.entity.findOneBy({ id });
			if (!entity) return r.setCode(HttpStatus.BAD_REQUEST).setMessage("数据不存在");
			const path = this.getFilePath(entity.fileName)
			unlinkSync(path)
			await this.entity.delete(entity)
			return r
		} catch (e) {
			return r.setCode(HttpStatus.INTERNAL_SERVER_ERROR).setMessage(e);
		}
	}

	private getFilePath(fileName: string): string {
		return join(Config.baseDir, Config.dictUploadDir, fileName)
	}
}
