import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { INestApplication } from "@nestjs/common";

let app: INestApplication< any > ;

async function bootstrap() {
    app = await NestFactory.create(AppModule);
    const config = new DocumentBuilder()
        .setTitle('API')
        .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);
    await app.listen(3000);
}
export const getApp = () => app
bootstrap();
