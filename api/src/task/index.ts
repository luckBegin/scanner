import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Task } from "./entity/index.entity";
import { TaskController } from "./controller/index.controller";
import { TaskService } from "./service/index.service";
import { MongooseModule } from "@nestjs/mongoose";
import { Domain, DomainSchema } from "./scheme/index.scheme";
import { ModelDefinition } from "@nestjs/mongoose/dist/interfaces/model-definition.interface";

const entities = [Task];
const mongo: Array< ModelDefinition > = [
	{ name: Domain.name, schema: DomainSchema }
]
@Module({
	imports: [
		TypeOrmModule.forFeature(entities),
		MongooseModule.forFeature(mongo)
	],
	controllers: [TaskController],
	providers: [TaskService],
})
export class TaskModule {
}
