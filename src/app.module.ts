import { Module } from "@nestjs/common";
import { DictModule } from "./dict";
import { SharedModule } from "./shared.module";

@Module({
    imports: [
        SharedModule,
        DictModule
    ],
    controllers: [],
    providers: [],
})
export class AppModule {
}
