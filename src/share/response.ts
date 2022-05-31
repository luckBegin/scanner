type Data = string | number | boolean | { [key: string]: Data } | Array<Data> | any;

export abstract class HttpResponse {
	public abstract code?: number ;
	public abstract data?: Data ;
	public abstract setCode: ( code: number ) => HttpResponse ;
	public abstract setData: ( data: Data ) => HttpResponse ;
}

export class ResponseModel implements HttpResponse{
	code = 200 ;
	data?: Data = null ;
	header: Record<string, string> = {} ;

	public setCode( code: number ): this{
		this.code = code ;
		return this ;
	}

	public setData( data: Data ): this{
		this.data = data ;
		return this;
	}

	public setError( error: string , desc: string ): this {
		return this.setData({
			error ,
			error_description: desc
		})
	}

	public setHeader( headers:Record<string, string> | string , description?: string): this {
		if(typeof headers === 'string') {
			Reflect.set(this.header, headers as string ,description )
		} else {
			Object.keys(headers).forEach(key => {
				Reflect.set(this.header , key , headers[key]) ;
			})
		}
		return this ;
	}
}
