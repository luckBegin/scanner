import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Dict } from "./entity/index.entity";
import { DictController } from "./controller/index.controller";
import { DictService } from "./service/index.service";

const entities = [ Dict ]
@Module({
	imports: [
		TypeOrmModule.forFeature( entities ) ,
	],
	controllers: [
		DictController
	],
	providers: [
		DictService
	],
})
export class DictModule {
}
