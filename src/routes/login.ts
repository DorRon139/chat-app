import { Request, Response } from 'express';
import * as Joi from 'joi'
import User from '../models/user/user.schema'
import { comparePassword } from '../utils/bcrypt';
import { generateAuthToken } from '../utils/jsonwebtoken';

const joiSchema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required().min(3)
})

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

        const user = await User.findOne({ username: username })

        if(!user) throw new Error('The username or the password is wrong')
        if(!comparePassword(password, user.password)) throw new Error('The username or the password is wrong')

        const tokenPayload = {
            ...user.toObject(),
            // frinds: user.populate('friends')
          
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
        res.status(500).send({ msg: `${error}`})
    }

}

export default login