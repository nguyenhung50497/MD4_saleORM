import { Schema, model } from 'mongoose';
export interface IUser {
    username ?: string;
    password ?: string;
    role ?: string;
}

const UserSchema = new Schema<IUser> ({
    username: String,
    password: String,
    role: String,
})

const User = model<IUser> ('User', UserSchema);
export {User};