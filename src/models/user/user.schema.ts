import { Schema, model} from "mongoose";
import { Iuser } from "./user.interface";

const userSchema = new Schema<Iuser>({
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
        type: [Schema.Types.ObjectId], //  ref to users
        default: [],
        ref: "User"
    },
    isOnline: {
        type: Boolean,
        default: false
    }
})

const User = model<Iuser>('User', userSchema)
export default User