import jwt from 'jsonwebtoken'
import config from '../../config'

export interface IToken {
	_id: string
}

export const generateToken = (obj: IToken) => {
	return jwt.sign(obj, config.jwt.secret)
}
