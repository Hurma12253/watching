import { Schema, model, Document } from 'mongoose'

export interface IMessage extends Document{
	author: string
	room: string
    text: string
}

const messageSchema = new Schema({
	author: {
		type: Schema.Types.ObjectId,
		required: true,
		ref: 'User',
	},
	room: {
		type: Schema.Types.ObjectId,
		required: true,
		ref: 'Room',
	},
	text: {
		type: String,
		required: false,
	},
})

export default model<IMessage>('Message', messageSchema)
