import { Body, Controller, Delete, Get, HttpCode, Param, Post, Query, Res } from "@nestjs/common";
import { Response } from "src/common";
import { TaskDto, TaskListQuery } from "../dto";
import { TaskService, ListRes } from "../service/index.service";

@Controller("task")
export class TaskController {
	constructor(
		private readonly service: TaskService,
	) {
	}

	@Post()
	async create(
		@Body() body: TaskDto,
		@Res() res,
	): Promise<Response<null>> {
		const r = await this.service.create(body);
		return res.status(r.code).json(r)
	}

	@Delete(":id")
	async delete(
		@Param("id") id: number,
		@Res() res,
	): Promise<Response<null>> {
		const r = await this.service.del(id);
		return res.status(r.code).json(r)
	}

	@Get()
	async list(
		@Query() q: TaskListQuery,
		@Res() res,
	): Promise<Response<ListRes>> {
		const r = await this.service.list(new TaskListQuery(q));
		return res.status(r.code).json(r)
	}

	@Post("/start/:id")
	async taskStart(
		@Param("id") id: number,
		@Res() res ,
	): Promise<Response<null>> {
		const r = await this.service.start(id);
		return res.status(r.code).json(r)
	}

	@Post("/terminate/:id")
	async terminate(
		@Param("id") id: number,
		@Res() res,
	): Promise<Response<null>> {
		const r = await this.service.terminate(id);
		return res.status(r.code).json(r)
	}
}
