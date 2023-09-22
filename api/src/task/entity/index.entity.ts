import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";
import {ApiProperty} from "@nestjs/swagger";
import {ScannerType} from "../../util/scanner";

export enum TaskType {
	SCAN="SCAN"
}

export enum TaskStatus {
	CREATED='CREATED',
	PENDING='PENDING',
	SUCCESS='SUCCESS',
	FAIL='FAIL',
	CANCEL='CANCEL',
}

@Entity()
export class Task {
	@PrimaryGeneratedColumn()
	@ApiProperty()
	id: number;

	@Column()
	@ApiProperty()
	name: string;

	@Column({type: "enum", enum: TaskType})
	type: TaskType;

	@Column({type: "enum", enum: ScannerType})
	scanner: ScannerType;

	@Column({type: "enum", enum: TaskStatus, default: TaskStatus.CREATED})
	status: TaskStatus;

	@Column()
	target: string;

	@Column({default: -1})
	startTime: number;

	@Column({type: 'json', nullable: true})
	parameter: Record<string, any>;

	@Column({type: "text", nullable: true})
	desc: string;
}


