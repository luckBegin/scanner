import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { ApiResponse, ApiTags, ApiOperation } from '@nestjs/swagger' ;
import { DTOReq } from '../entities/req.entity'
import { ReqService } from '../service/index.service';
const urlPrefix: string = 'req';

@ApiTags('请求')
@Controller(urlPrefix)
export class ReqController {
	constructor(
		private service: ReqService
	) {
	}

	@Post()
	@ApiResponse({ status: 200, description: '成功' })
	@ApiOperation({ summary: '新增req任务' })
	async post(
		@Res() res,
		@Body() body: DTOReq
	) {
		const response = await this.service.post(body)
		return res.status(response.code).send(response.data);
	}
}
