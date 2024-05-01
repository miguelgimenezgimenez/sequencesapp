import mongoose, { Schema, Document, Model } from 'mongoose';

export enum Role {
    admin = "admin",
    user = "user"
}

export interface IUser extends Document {
    email: string;
    password: string;
    dateAdded: Date;
    role: Role;
}

const userSchema = new Schema<IUser>({
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    dateAdded: { type: Date, default: Date.now, required: true },
    role: { type: String, enum: Role, default: Role.user }
});


const User: Model<IUser> = mongoose.model('User', userSchema);

export default User;
