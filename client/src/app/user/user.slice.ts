import { createSlice } from '@reduxjs/toolkit'
import jwt_decode, { JwtPayload } from 'jwt-decode'

export interface Iuser {
    _id: string;
    username: string;
    email: string;
    socketID?: string;
    friends: string[];
    isOnline: boolean;
  }

type decodedJwt = JwtPayload & Iuser

type initialStateType = {
    token: string | null,
    currentUser: Iuser | null,
    userFriends: Iuser[] | null,
}


const getCurrentUser = (token = localStorage.getItem('token')) => {
    if(token){
    const user = jwt_decode<decodedJwt>(token || '') || null
                const {
                    _id,
                    username,
                    email,
                    socketID,
                    friends,
                    isOnline,
                } = user
                return {
                    _id,
                    username,
                    email,
                    socketID,
                    friends,
                    isOnline,
                }
 }
 return null
}

const initialState: initialStateType = {
    token: localStorage.getItem('token') || null,
    currentUser: getCurrentUser(),
    userFriends: null,
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setToken: (state, action) => {
            state.token = action.payload
            state.currentUser = getCurrentUser(action.payload)
        },
        setCurrentUser: (state, action) => {
            state.currentUser = action.payload
        },
        setUserFriends: (state, action) => {
            state.userFriends = action.payload
        },
        addSocketId: (state, action) => {
            if(state.currentUser){
                state.currentUser.socketID = action.payload
            }
        }
    },
})

export const {
    setToken,
    setCurrentUser,
    setUserFriends,
    addSocketId
} = userSlice.actions
export default userSlice.reducer
