import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Task } from "./entity/index.entity";
import { TaskController } from "./controller/index.controller";
import { TaskService } from "./service/index.service";

const entities = [Task];

@Module({
	imports: [
		TypeOrmModule.forFeature(entities),
	],
	controllers: [TaskController],
	providers: [TaskService],
})
export class TaskModule {
}
