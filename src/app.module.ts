import { Module} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CONFIG } from './config';
import { DictModule } from './module/dict/index.module';
import { ReqModule } from './module/req/index.module';
import { ProxyModule } from './module/proxy/index.module';
const modules = [
	DictModule,
	ReqModule,
	ProxyModule
]
@Module({
	imports: [ ...modules , TypeOrmModule.forRoot( CONFIG.dataBases as any )],
	controllers: [],
})
export class AppModule {}
