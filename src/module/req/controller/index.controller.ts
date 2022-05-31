import { Controller, Get } from '@nestjs/common';
import { ApiResponse, ApiTags, ApiOperation } from '@nestjs/swagger' ;

const urlPrefix: string = 'req';

@ApiTags('请求')
@Controller()
export class ReqController {
	constructor(
	) {
	}

	@Get()

}
