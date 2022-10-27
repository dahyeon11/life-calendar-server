import mongoose from "mongoose";

export interface UserDocument {
    id: string;
    password: string;
    name?: string;
    createdAt?: Date;
    updatedAt?: Date;
}


export const UserSchema = new mongoose.Schema<UserDocument>({
    id: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String },
},
{
    timestamps: true
})