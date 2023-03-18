import { Request, Response } from 'express';
import * as Joi from 'joi'

const joiSchema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required().min(3)
})

const login = async (req: Request, res: Response) => {
    try {
        const { error, value } = await joiSchema.validate(req.body)
        if(error) throw new Error(error.toString())
        
        console.log(req.body)
        res.send('ok')
    } catch (error: unknown) {
        console.error(`Error with route login - ${error}`)
        res.status(500).send({ msg: `${error}`})
    }

}

export default login