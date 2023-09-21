import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { join } from "path";
import { MongooseModule } from "@nestjs/mongoose";

@Module({
	imports: [
		MongooseModule.forRoot("mongodb://root:root@192.168.171.128:27017", { dbName: "scanner" }),
		TypeOrmModule.forRoot({
			type: "mysql",
			host: "192.168.171.128",
			port: 3306,
			username: "root",
			password: "root",
			database: "exploit",
			entities: [join(__dirname, "**", "*.entity.{ts,js}")],
			synchronize: true,
			logging: false,
		}),
	],
	controllers: [],
	providers: [],
})
export class SharedModule {
}
