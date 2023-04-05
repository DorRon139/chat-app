import { Schema, Document } from "mongoose";
import { Iuser } from "../user/user.interface";

export interface Iconversation extends Document {
    _id?: string;
    participants: Iuser[];
  }