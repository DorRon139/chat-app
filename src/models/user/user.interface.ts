import { Schema, Document } from "mongoose";

export interface Iuser extends Document {
    _id?: string;
    username: string;
    email: string;
    password: string;
    socketID?: string;
    friends: Schema.Types.ObjectId[];
    isOnline: boolean;
  }