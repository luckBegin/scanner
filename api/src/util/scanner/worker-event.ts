export enum OutputEventType {
	INIT,
	UPDATE,
	ERROR,
	COMPLETE,
}
export interface OutputEvent {
	type: OutputEventType
	data: {
		success: false ,
		message: string,
		[key: string]: any
	}
}

export enum InputEventType {
	update,
}
export interface InputEvent<T> {
	type: InputEventType
	data: T
	message: string
}
