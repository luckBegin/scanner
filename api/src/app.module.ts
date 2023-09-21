import { Module } from "@nestjs/common";
import { DictModule } from "./dict";
import { SharedModule } from "./shared.module";
import { TaskModule } from "./task";

@Module({
    imports: [
        SharedModule,
        DictModule,
        TaskModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {
}
