import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { ApiResponse, ApiTags, ApiOperation } from '@nestjs/swagger';
import { ProxyService } from '../service/index.service';
const urlPrefix: string = 'proxy';

@ApiTags('代理池')
@Controller(urlPrefix)
export class ProxyController {
	constructor(private service: ProxyService) {}

	@Get()
	@ApiResponse({ status: 200, description: '成功' })
	@ApiOperation({ summary: '查询代理' })
	async post(@Res() res) {
		const response = await this.service.get();
		return res.status(response.code).send(response.data);
	}
}
