import { Schema, model, Document } from 'mongoose'

export interface IRoom extends Document {
	name: string
	password?: string
	filmUrl?: string
	users?: [{_id: string}]
	matchPassword?: (password: string) => boolean
	userExists?: (userId: string) => boolean
}

const roomSchema = new Schema({
	name: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: false,
		default: '',
	},
	filmUrl: {
		type: String,
		required: false,
	},
	users: [{ userId: { type: Schema.Types.ObjectId, ref: 'User' } }],
})

roomSchema.methods.matchPassword = function (password: string) {
	if (!this.password) {
		return true
	}
	return this.password == password
}

roomSchema.methods.userExists = function (userId: string) {
	const userExists = this.users.find((el: any) => el._id == userId)

	return userExists ? true : false
}

export default model<IRoom>('Room', roomSchema)
