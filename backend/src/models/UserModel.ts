import {Schema, model, Document} from 'mongoose'
import bcrypt from 'bcrypt'

export interface IUser extends Document{
    name: string
    password: string
    matchPassword?: (password: string) => boolean
}

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true,
    }
})

userSchema.pre<IUser>('save',async function(next){
    if(!this.isModified('password')){
        return next()
    } else {
        this.password = await bcrypt.hash(this.password, 10)
    }
})

userSchema.methods.matchPassword = function(password: string){
    return bcrypt.compareSync(password, this.password)
}

export default model<IUser>('User', userSchema)