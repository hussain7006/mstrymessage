import mongoose, { Schema, Document } from "mongoose";


export interface Message extends Document {
    content: string;
    createdAt: Date
}


const MessageScema: Schema<Message> = new Schema({
    content: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    }
})


export interface User extends Document {
    username: string;
    email: string;
    password: string;
    verifyCode: string;
    verifyCodeExpiry: Date;
    isVerified: boolean,
    isAcceptingMessage: boolean;
    messages: Message[]
}


const UserScema: Schema<User> = new Schema({
    username: {
        type: String,
        required: [true, "Username is required"],
        trim: true,
        unique: true,
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        match: [/.+\@.+\..+/, 'please use a valid email address']
    },
    password: {
        type: String,
        required: [true, "Password is required"],
    },
    verifyCode: {
        type: String,
        required: [true, "Verify code is required"],
    },
    verifyCodeExpiry: {
        type: Date,
        required: [true, "Verify code expiry is required"],
    },
    isVerified: {
        type: Boolean,
        Default: false
    },
    isAcceptingMessage: {
        type: Boolean,
        Default: true
    },
    messages: [MessageScema]

})


const UserModel = (mongoose.models.User as mongoose.Model<User>) || mongoose.model<User>("User", UserScema)

export default UserModel