import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";

export enum TaskType {
	SCAN
}

export enum TaskStatus {
	SUCCESS,
	FAIL,
	PENDING,
	CANCEL
}
@Entity()
export class Task {
	@PrimaryGeneratedColumn()
	@ApiProperty()
	id: number;

	@Column()
	@ApiProperty()
	name: string;

	@Column({ type: "enum", enum: TaskType })
	type: TaskType;


	@Column({ type: "enum", enum: TaskStatus})
	status: TaskStatus;

	@Column()
	target: string;

	@Column({ default: -1 })
	startTime: number;

	@Column({type: 'json'})
	parameter: string ;

	@Column({type:"text"})
	desc: string ;
}
