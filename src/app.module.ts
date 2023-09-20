import { Module } from "@nestjs/common";
import { DictModule } from "./dict";
import { SharedModule } from "./shared.module";
import { TaskModule } from "./task";
import { CacheModule } from "@nestjs/cache-manager";

@Module({
    imports: [
        SharedModule,
        DictModule,
        TaskModule,
        CacheModule.register()
    ],
    controllers: [],
    providers: [],
})
export class AppModule {
}
