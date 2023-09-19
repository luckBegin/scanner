import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import * as stream from "stream";
export enum DictType {
	USERNAME = 'username',
	PASSWORD = 'password',
	DIR = 'dit',
	PARA = 'para',
	DOMAIN = 'domain'
}

@Entity()
export class Dict {
	@PrimaryGeneratedColumn()
	@ApiProperty()
	id: number;

	@Column()
	@ApiProperty()
	name: string;

	@Column()
	@ApiProperty()
	fileName: string;

	@Column({
		type: "enum",
		enum: DictType,
		default: DictType.USERNAME
	})
	@ApiProperty({type: DictType})
	type: DictType;
}
