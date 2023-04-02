import bcrypt from 'bcrypt'

const saltround = 10; // TODO: env



export const hashPassword = (password: string) => {
    return bcrypt.hashSync(password, saltround)
}

export const comparePassword = (passwordToCheck: string, hashed: string) => {
    return bcrypt.compareSync(passwordToCheck, hashed)
}