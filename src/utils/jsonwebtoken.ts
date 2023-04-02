import jwt from 'jsonwebtoken'
const {
    SECRET_TOKEN
} = require('../../const')

export const generateAuthToken = async (payload: object, secret = SECRET_TOKEN, expiresIn: string = '2 days') => {
    const token = await jwt.sign(
        payload,
        SECRET_TOKEN,
        {
            expiresIn
        },
    )
    return token
}