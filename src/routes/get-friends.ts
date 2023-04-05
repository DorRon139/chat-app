import { Request, Response } from 'express';
import * as Joi from 'joi'
import User from '../models/user/user.schema'

const joiSchema = Joi.object({
    userId: Joi.string().required(),
})

const getFriendsById = async (req: Request, res: Response) => {
    try {
        const { body } = req
        const { error, value } = await joiSchema.validate(body)
        if(error) throw new Error(error.toString())
        
        const {
            userId,
        } = body

        const populationResponse = await User.findById({
            _id: userId
        }).populate({
            path: 'friends',
            model: 'User',
        })
        
        return res.send({
            success: true,
            friends: populationResponse?.friends
        })

    } catch (error: unknown) {
        console.error(`Error with route get-friends - ${error}`)
        res.status(500).send({
            success: false,
            msg: `${error}`
        })
    }

}

export default getFriendsById