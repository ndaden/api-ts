import { model, Document, Schema } from 'mongoose';

export const DOCUMENT_NAME = 'role';
export const COLLECTION_NAME = 'roles';

export default interface Role extends Document {
    roleCode: string;
    roleName: string;
}

const schema = new Schema({
    roleCode: {
        type: String,
        required: 'Role code is required',
        uppercase: true,
        trim: true,
        unique: true,
    },
    roleName: {
        type: String,
        required: 'Role name is required',
    },
});

export const RoleModel = model<Role>(DOCUMENT_NAME, schema, COLLECTION_NAME);
