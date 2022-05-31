import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';
import { IsNotEmpty } from 'class-validator';

@Entity({ name: 'dict' })
export class DictEntity {
	@PrimaryColumn()
	@ApiProperty({ description: 'id' })
	id: string;

	@Column()
	@ApiProperty({ description: '文件名称', required: true })
	@IsNotEmpty({ message: '文件名称不能为空' })
	name: string;

	@Column()
	@ApiProperty({ description: '路径'})
	path: string;

	@Column()
	@ApiProperty({ description: '服务类别 1: 用户名 , 2: 密码 , 3: 路径', required: true })
	@IsNotEmpty({ message: '服务类别不能为空' })
	type: number;

	@Column()
	@ApiProperty({ description: '描述'})
	desc: string;
}


export class DTODict {
	@ApiProperty({ description: '文件名称', required: true })
	@IsNotEmpty({ message: '文件名称不能为空' })
	name: string;

	@ApiProperty({ description: '类别 1: 用户名 , 2: 密码 , 3: 路径', required: true })
	@IsNotEmpty({ message: '服务类别不能为空' })
	type: number;

	@ApiProperty({ description: '路径不能为空', required: true })
	@IsNotEmpty({ message: '路径不能为空' })
	path: string

	@ApiProperty({ description: '描述'})
	desc: string

	@ApiProperty({ description: 'id'})
	id?: string
}

export class QDict {
	@ApiProperty({ description: '类别 1: 用户名 , 2: 密码 , 3: 路径'})
	type: number;

	@ApiProperty({ description: 'skip'})
	skip:number

	@ApiProperty({ description: 'take'})
	take:number
}

export class Query {
	skip: number;
	take: number ;
	where: Record<string, any> = {}

	constructor(data: QDict) {
		if( data.skip ) this.skip = data.skip ;
		if( data.take ) this.take = data.take ;
		if( data.type) this.where.type = data.type
	}
}
