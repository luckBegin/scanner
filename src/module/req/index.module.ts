import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

const controls = [
];
const services = [
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
export class ReqModule {
}
