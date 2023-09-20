import { HttpStatus } from "@nestjs/common";

export interface IListResponse<T> {
	total: number
	totalPage?: number
	current?: number
	pageNumber?: number
	pageSize?: number
	result: T
}

export class ListResponse<T> implements IListResponse<T>{
	total: number
	totalPage: number
	current: number
	pageNumber: number
	pageSize: number
	result:T;
}

export class Response<T>{
	code: HttpStatus = HttpStatus.OK
	data: T = null
	message: string = ''

	static build<T> () {
		return new Response<T>()
	}

	setCode(c: HttpStatus): this {
		this.code = c ;
		return this
	}

	setMessage(m: string): this {
		this.message = m ;
		return this
	}

	setData(data: T): this {
		this.data = data ;
		return this
	}

	error(m: string,code = HttpStatus.INTERNAL_SERVER_ERROR): this {
		return this.setCode(code).setMessage(m)
	}

	badReq(m: string): this {
		return this.setCode(HttpStatus.BAD_REQUEST).setMessage(m)
	}
}
