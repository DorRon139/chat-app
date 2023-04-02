import { createSlice } from '@reduxjs/toolkit'
import jwt_decode, { JwtPayload } from 'jwt-decode'

export interface userInterface {
    _id: string;
    username: string;
    email: string;
    password: string;
    socketID?: string;
    friends: string[];
  }

type decodedJwt = JwtPayload & userInterface

type initialStateType = {
token: string | null,
currentUser: userInterface | null
}

const initialState: initialStateType = {
    token: localStorage.getItem('token') || null,
    currentUser: null,
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setToken: (state, action) => {
            state.token = action.payload
            if(action.payload){
                const user = jwt_decode<decodedJwt>(action.payload || '') || null
                const {
                    _id,
                    username,
                    email,
                    password,
                    socketID,
                    friends,
                } = user
                state.currentUser = {
                    _id,
                    username,
                    email,
                    password,
                    socketID,
                    friends,
                }
            }
        },
        setCurrentUser: (state, action) => {
            state.currentUser = action.payload
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
    addSocketId
} = userSlice.actions
export default userSlice.reducer
