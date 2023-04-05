import { useMutation } from "react-query";
import { useDispatch } from "react-redux";
import { apiRequest } from "../utils/api-request";
import { setUserFriends } from '../app/user/user.slice'

const getFriendsById = ( userId : string) => {
    const reqestBody = {
        userId,
    }
    return apiRequest('getFriendsById', reqestBody)
}

export const useGetUserFriends = () => {
    const dispatch = useDispatch()
    return useMutation(getFriendsById, {
        onSuccess: async (res: any) => {
            const { friends } = res.data
            await dispatch(setUserFriends(friends))
        },
    })
}