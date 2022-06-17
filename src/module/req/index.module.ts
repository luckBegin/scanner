import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReqController } from './controller/index.controller'
import { ReqEntity } from './entities/req.entity';
import { ReqService } from './service/index.service';
import { DictModule } from '../dict/index.module';

const controls = [
	ReqController
];
const services = [
	ReqService
];
const entities = [
	ReqEntity
];

@Module({
	imports: [
		TypeOrmModule.forFeature(entities),
		DictModule
	],
	controllers: [
		...controls,
	],
	providers: [
		...services,
	],
	exports: [
		...services,
	],
})
export class ReqModule {
}
