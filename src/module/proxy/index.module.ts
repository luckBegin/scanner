import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProxyService } from './service/index.service';
import { ProxyController } from './controller/index.controller';

const controls = [
	ProxyController
];
const services = [
	ProxyService
];
const entities = [
];

@Module({
	imports: [
		TypeOrmModule.forFeature(entities),
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
export class ProxyModule {
}
