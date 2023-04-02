import { Schema, model} from "mongoose";
import { userInterface } from "./userInterface";

const userSchema = new Schema<userInterface>({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true,
    },
    socketID: {
        type: String
    },
    friends: {
        type: [String], //  ref to users
        default: []
    }
})

const User = model<userInterface>('User', userSchema)
export default User