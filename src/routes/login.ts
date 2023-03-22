import { Request, Response } from 'express';
import * as Joi from 'joi'
import jwt, { SignOptions } from 'jsonwebtoken'
import { userInterface } from '../models/user/userInterface';
import User from '../models/user/user.schema'


const joiSchema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required().min(3)
})

const checkUserPassword = (user: userInterface, password: string) => { // TODO: encriped the password
    if(password === user.password) return true
    return false
}
const login = async (req: Request, res: Response) => {
    try {
        const { body } = req
        const { error, value } = await joiSchema.validate(body)
        if(error) throw new Error(error.toString())
        
        const {
            username,
            password
        } = body
        console.info('Try to login user', username)

        const user = await User.findOne({ username: username }).exec()

        if(!user) throw new Error('The username or the password is wrong')
        if(!checkUserPassword(user, password)) throw new Error('The username or the password is wrong')

        const tokenPayload = {
            email: user.email,
        }

        const accessToken = jwt
        console.info(`${username} is connected`)
        return res.send('ok')
    } catch (error: unknown) {
        console.error(`Error with route login - ${error}`)
        res.status(500).send({ msg: `${error}`})
    }

}

export default login