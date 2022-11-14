import mongoose from "mongoose";

export interface UserDocument {
    id: string;
    password: string;
    name?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface TodoDocument {
    user_id: string;
    title: string;
    content: string;
    date: Date;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface DiaryDocument {
    user_id: string;
    title: string;
    content: string;
    date: Date;
    color: string;
    createdAt?: Date;
    updatedAt?: Date;
}


export const UserSchema = new mongoose.Schema<UserDocument>({
    id: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String },
},
{
    timestamps: true,
    versionKey: false
})

export const  TodoSchema = new mongoose.Schema<TodoDocument>({
    title: { type: String, required: true },
    content: { type: String, required: true },
    user_id: { type: String, required: true, select: false },
    date: { type: Date, required: true }
},
{
    timestamps: true,
    versionKey: false
})

export const DiarySchema = new mongoose.Schema<DiaryDocument>({
    user_id: { type: String, required: true, select: false },
    title: { type: String, required: true },
    content: { type: String, required: true },
    color: { type: String, required: true },
    date: { type: Date, required: true }
}, {
    timestamps: true,
    versionKey: false
})