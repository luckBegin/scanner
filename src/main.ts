import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger' ;
import { CONFIG } from './config';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
	const app = await NestFactory.create<NestExpressApplication>(AppModule);
	if (CONFIG.swagger.enabled) {
		const swaggerOpt = new DocumentBuilder()
			.setTitle('API DOC')
			.setDescription('API DOC')
			.setVersion('V1.0.0')
			.build();
		const document = SwaggerModule.createDocument(app, swaggerOpt);
		SwaggerModule.setup(CONFIG.swagger.path, app, document);
	}

	app.enableCors({
		origin: true,
		allowedHeaders: 'jwt-token , jwt-user-id , jwt-shop , jwt-staff-id , Content-type',
		methods: 'POST , GET , PUT , DELETE',
	});
	app.useStaticAssets(join(__dirname, '..', 'public'));
	app.setBaseViewsDir(join(__dirname, '..', 'views'));
	app.useGlobalPipes(new ValidationPipe());
	app.setViewEngine('pug');

	await app.listen(CONFIG.port);
}

bootstrap();
