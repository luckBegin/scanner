import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DictController } from './controller/index.controller';
import { DictEntity } from './entities/dict.entity';
import { DictService } from './service/index.service';

const controls = [
	DictController
];
const services = [
	DictService
];
const entities = [
	DictEntity
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
export class DictModule {
}
