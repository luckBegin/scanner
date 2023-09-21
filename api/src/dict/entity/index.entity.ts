import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
export enum DictType {
	USERNAME = 'USERNAME',
	PASSWORD = 'PASSWORD',
	DIR = 'DIR',
	PARA = 'PARA',
	DOMAIN = 'DOMAIN'
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
