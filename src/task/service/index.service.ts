import { HttpStatus, Inject, Injectable } from "@nestjs/common";
import { TaskDto, TaskListQuery } from "../dto";
import { ListResponse, Response } from "../../common";
import { InjectRepository } from "@nestjs/typeorm";
import { Task } from "../entity/index.entity";
import { Repository } from "typeorm";
import { ScannerManage } from "../../util/scanner";
import { CACHE_MANAGER } from '@nestjs/cache-manager';

export type List = Array< Task >;
export type ListRes = ListResponse< List >
@Injectable()
export class TaskService {
	constructor(
		@InjectRepository(Task)
		private entity: Repository<Task>,

		@Inject(CACHE_MANAGER)
		private cacheManager: any
	) {
	}

	async list(q: TaskListQuery): Promise< Response< ListRes > > {
		const r = new Response<ListRes>()
		try {
			const result = await this.entity.findAndCount({
				where: { type: q.type, target: q.target, status: q.status },
				skip: (q.pageNumber - 1 ) * q.pageSize,
				take: q.pageSize,
			});
			const listResponse = new ListResponse< List >();
			listResponse.total = result[1];
			listResponse.result = result[0] ;
			return r.setData(listResponse)

		} catch (e) {
			return r.error(e.toString())
		}
	}

	async create(body: TaskDto): Promise< Response<null>> {
		const r = new Response<null>()
		try {
			const entity = this.entity.create(body)
			await this.entity.insert(entity)
			return r
		} catch (e) {
			return r.error(e.toString())
		}
	}

	async del(id: number): Promise< Response<null> > {
		const r = new Response<null>()
		try {
			const e = await this.entity.findOneBy({id});
			if(!e) return r.badReq('数据不存在')
			await this.entity.delete(e)
		} catch (e) {
			return r.error(e.toString())
		}
	}

	async start(id: number): Promise< Response<null> > {
		const r = new Response<null>()
		try {
			const entity = await this.entity.findOne({where:{id}})
			const sid = ScannerManage.Run(entity.scanner,entity.parameter);
			console.log(this.cacheManager.set);
			// this.cacheManager.('key', 'value');
			console.log(sid);
			return r
		} catch (e) {
			return r.error(e.toString())
		}
	}

	async terminate(id: number): Promise< Response<null> > {
		const r = new Response<null>()
		try {
			ScannerManage.terminate('id');
		} catch (e) {
			return r.error(e.toString())
		}
	}
}
