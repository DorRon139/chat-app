import { createSlice } from '@reduxjs/toolkit'


export interface userInterface {
    _id: string;
    username: string;
    email: string;
    password: string;
    socketID?: string;
    friends: string[];
  }

const initialState = {
    currentUser: <userInterface>{
        _id: "1234",
        username: "Dor Ron",
        email: "dor@ron.gmail.com",
        password: "123",
        friends: ["5678", "4321", "1243"],
      },
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login: (state, action) => {
            state.currentUser = action.payload
        },
        addSocketId: (state, action) => {
            state.currentUser.socketID = action.payload
        }
    }
})

export const {
    login,
    addSocketId
} = userSlice.actions
export default userSlice.reducer
