
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema()
export class Domain {
	@Prop()
	taskId: number;

	@Prop()
	address: string

	@Prop()
	domain: string
}

export const DomainSchema = SchemaFactory.createForClass(Domain);
