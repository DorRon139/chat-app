import { createSlice } from '@reduxjs/toolkit'


export interface userInterface {
    _id: string;
    socketID?: string;
    name: string;
    friends: string[];
  }

const initialState = {
    currentUser: <userInterface>{
        _id: "1234",
        name: "Dor Ron",
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
