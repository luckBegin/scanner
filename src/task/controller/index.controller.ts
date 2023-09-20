import { Body, Controller, Delete, Get, Param, Post, Query } from "@nestjs/common";
import { Response } from "src/common";
import { ITaskListQuery, TaskDto, TaskListQuery } from "../dto";
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
	): Promise<Response<null>> {
		return this.service.create(body);
	}

	@Delete(':id')
	async delete(
		@Param('id') id: number
	): Promise< Response<null> > {
		return this.service.del(id)
	}

	@Get()
	async list(
		@Query() q: TaskListQuery
	): Promise< Response<ListRes> >  {
		return this.service.list(new TaskListQuery(q))
	}

	@Post('/start/:id')
	async taskStart(
		@Param('id') id: number
	): Promise< Response< null > >  {
		return this.service.start(id)
	}
}
