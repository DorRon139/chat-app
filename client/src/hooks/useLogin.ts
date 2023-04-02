import { useMutation } from "react-query";
import { useDispatch } from "react-redux";
import { apiRequest } from "../utils/api-request";
import { setToken } from '../app/user/user.slice'

type loginInfo = {
    username: string,
    password: string,
}

const login = ({ username, password }: loginInfo) => {
    const reqestBody = {
        username,
        password
    }
    return apiRequest('login', reqestBody)
}

export const useLogin = () => {
    const dispatch = useDispatch()
    return useMutation(login, {
        onSuccess: async (res: any) => {
            const { token } = res.data
            localStorage.setItem('token', token)
            await dispatch(setToken(token))
        },
    })
}