import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'req' })
export class ReqEntity {
	@PrimaryColumn()
	@ApiProperty({ description: 'id' })
	id: string;

	@Column()
	@ApiProperty({ description: 'url' })
	url: string;

	@Column()
	@ApiProperty({ description: 'body' })
	body: string;

	@Column()
	@ApiProperty({ description: 'bodyDict' })
	bodyDict: string;

	@Column()
	@ApiProperty({ description: 'bodyParser' })
	bodyParser: string;

	@Column()
	@ApiProperty({ description: 'contentType' })
	contentType: string;

	@Column()
	@ApiProperty({ description: 'status 0:创建 1: 运行 3: 完成' })
	status: number;

	@Column()
	@ApiProperty({ description: 'result' })
	result: string;

	@Column()
	@ApiProperty({ description: 'method' })
	method: string;
}

export class DTOReq {
	@ApiProperty({ description: 'method' , required: true })
	@IsNotEmpty({ message: '请求方式不能为空'})
	method: string ;

	@ApiProperty({ description: 'url', required: true })
	@IsNotEmpty({ message: 'url不能为空'})
	url: string ;

	@ApiProperty({ description: 'body template string' })
	body: string

	@ApiProperty({ description: 'content-type'})
	contentType: string

	@ApiProperty({ description: 'body parser' , required:true })
	bodyParser: string

	@ApiProperty({description: 'body dict'})
	bodyDict: Record<string, string>

	@ApiProperty({description: '线程数', required: false})
	thread: number
}
