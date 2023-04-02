import { Request, Response } from 'express';
import * as Joi from 'joi'
import User from '../models/user/user.schema'
import { hashPassword } from '../utils/bcrypt';
import { generateAuthToken } from '../utils/jsonwebtoken';
import login from './login';


const joiSchema = Joi.object({
    username: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().required().min(3)
})

const register = async (req: Request, res: Response) => {
    try {
        console.info('Start register route')
        const { body } = req
        const { error, value } = await joiSchema.validate(body)
        if(error) throw new Error(error.toString())
        
        const {
            username,
            email,
            password
        } = body

        console.info('Saving user to the db', username)
        const hashedPasswarod = hashPassword(password)
        const newUser = await new User({
            username,
            email,
            password: hashedPasswarod
        }).save()

        if(!newUser) throw new Error('cannot save user to db')
        console.info('user saved successfuly, loggin in')

        const tokenPayload = {
            ...newUser
        }

        const accessToken = await generateAuthToken(tokenPayload)

        console.info(`${username} is connected`)
        return res.send({
            status: true,
            message: 'User logged in',
            token: accessToken
        })
    } catch (error: unknown) {
        console.error(`Error with route login - ${error}`)
        res.status(500).send({
            success: false,
            msg: `${error}`
        })
    }

}

export default register