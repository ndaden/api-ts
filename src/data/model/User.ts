import { model, Document, Schema } from 'mongoose';
import Role, { RoleModel } from './Role';
import ActivationCode, { ActivationCodeModel } from './ActivationCode';

export const DOCUMENT_NAME = 'user';
export const COLLECTION_NAME = 'users';

export default interface User extends Document {
    username: string;
    email: string;
    password: string;
    avartarUrl: string;
    isActive: boolean;
    isBlocked: boolean;
    activationDate: Date;
    activationCode: ActivationCode;
    roles: Role[];
    createdAt?: Date;
    updatedAt?: Date;
}

const schema = new Schema({
    username: {
        type: String,
        required: 'Username is required',
        unique: true,
    },
    email: {
        type: String,
        required: 'Email is required',
        lowercase: true,
        unique: true,
    },
    password: {
        type: String,
        select: false,
        trim: true,
    },
    avatarUrl: {
        type: String,
        trim: true,
    },
    isActive: {
        type: Boolean,
        default: false,
    },
    isBlocked: {
        type: Boolean,
        default: false,
    },
    activationDate: {
        type: Date,
    },
    activationCode: {
        type: Schema.Types.ObjectId,
        ref: ActivationCodeModel,
    },
    roles: [
        {
            type: Schema.Types.ObjectId,
            ref: RoleModel,
        },
    ],
    createdAt: {
        type: Date,
        required: true,
        select: false,
    },
    updatedAt: {
        type: Date,
        required: true,
        select: false,
    },
});

export const UserModel = model<User>(DOCUMENT_NAME, schema, COLLECTION_NAME);
