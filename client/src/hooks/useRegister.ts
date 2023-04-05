import { useMutation } from "react-query";
import { useDispatch } from "react-redux";
import { apiRequest } from "../utils/api-request";
import { setToken, Iuser } from '../app/user/user.slice'

type registerInfo = {
    username: string,
    email: string,
    password: string,
}

const register = ({ username, email, password }: registerInfo) => {
    const reqestBody = {
        username,
        email,
        password
    }
    return apiRequest('register', reqestBody)
}

export const useRegister = () => {
    const dispatch = useDispatch()
    return useMutation(register, {
        onSuccess: async (res: any) => {
            const { token } = res.data
            localStorage.setItem('token', token)
            await dispatch(setToken(token))
        },
    })
}