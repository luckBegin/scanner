import { TaskStatus, TaskType } from "../entity/index.entity";
import { IQuery, Query } from "../../common/model/query";

export interface TaskDto {
	id?: number
	name: string
	type: TaskType
	target: string
	thread: number
	startTime?: number
	parameter: string
	desc?: string
}

export interface ITaskListQuery extends IQuery{
	type: TaskType
	target: string
	status: TaskStatus
}
export class TaskListQuery extends Query implements ITaskListQuery{
	type: TaskType
	target: string
	status: TaskStatus;
	constructor(d: ITaskListQuery) {
		super(d);
		if(d) {
			d.type && ( this.type = d.type );
			d.target && (this.target = d.target )
			d.status && (this.status = d.status)
		}
	}


}
