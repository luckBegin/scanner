import { HttpStatus, Inject, Injectable } from "@nestjs/common";
import { TaskDto, TaskListQuery } from "../dto";
import { ListResponse, Response } from "../../common";
import { InjectRepository } from "@nestjs/typeorm";
import {Task, TaskStatus} from "../entity/index.entity";
import { Repository } from "typeorm";
import { ScannerManage, ScannerOutputType } from "../../util/scanner";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Domain } from "../scheme/index.scheme";

export type List = Array< Task >;
export type ListRes = ListResponse< List >
@Injectable()
export class TaskService {
	constructor(
		@InjectRepository(Task)
		private entity: Repository<Task>,

		@InjectModel(Domain.name)
		private domainModel: Model<Domain>
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
			await this.domainModel.deleteMany({ taskId:1 });
			await this.entity.delete(e)
			return r
		} catch (e) {
			return r.error(e.toString())
		}
	}

	private scannerList: Record<number, string> = {}

	async start(id: number): Promise< Response<null> > {
		const r = new Response<null>()
		try {
			const entity = await this.entity.findOne({where:{id}})
			if( !entity ) return r.badReq('数据不存在')
			const result = await ScannerManage.Run(entity.scanner,entity.parameter);
			if( !result.success ) return r.badReq(result.message)
			entity.status = TaskStatus.PENDING
			await this.entity.update(entity.id, entity)
			result.scanner.$output.subscribe( ({type,data}) => {
				if( type === ScannerOutputType.COMPLETE ) {
					delete this.scannerList[id]
					entity.status = TaskStatus.SUCCESS
					this.entity.update(entity.id, entity)
				}
				if( type === ScannerOutputType.UPLOAD ) {
					if(data.success) this.domainModel.create({taskId: id , ...data })
				}
			})
			this.scannerList[id] = result.id
			return r
		} catch (e) {
			return r.error(e.toString())
		}
	}

	async terminate(id: number): Promise< Response<null> > {
		const r = new Response<null>()
		try {
			const entity = await this.entity.findOne({where:{id}})
			if( !entity ) return r.badReq('数据不存在')
			entity.status = TaskStatus.CANCEL
			this.entity.update(entity.id, entity)
			delete this.scannerList[id]
			ScannerManage.terminate(this.scannerList[id]);
			return r
		} catch (e) {
			return r.error(e.toString())
		}
	}
}
