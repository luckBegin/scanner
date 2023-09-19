import { HttpStatus } from "@nestjs/common";

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
}
