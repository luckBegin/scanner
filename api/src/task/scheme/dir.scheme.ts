
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema()
export class Dir {
	@Prop()
	taskId: number;

	@Prop()
	type: string;

	@Prop()
	host: string

	@Prop()
	size: string

	@Prop()
	statusCode: number
}

export const DirSchema = SchemaFactory.createForClass(Dir);
