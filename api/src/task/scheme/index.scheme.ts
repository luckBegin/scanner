
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CatDocument = HydratedDocument<Domain>;

@Schema()
export class Domain {
	@Prop()
	taskId: number;

	@Prop()
	address: string

	@Prop()
	domain: string

	@Prop()
	success: boolean ;
}

export const DomainSchema = SchemaFactory.createForClass(Domain);
