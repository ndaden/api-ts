import { model, Document, Schema } from 'mongoose';

export const DOCUMENT_NAME = 'activationCode';
export const COLLECTION_NAME = 'activationcodes'; // warning: keep it lower case

export default interface ActivationCode extends Document {
    validationCode: string;
    validationCodeSendDate: Date;
    validationCodeExpirationDate: Date;
}

const schema = new Schema({
    validationCode: {
        type: String,
        trim: true,
        maxlength: 6,
    },
    validationCodeSendDate: {
        type: Date,
    },
    validationCodeExpirationDate: {
        type: Date,
    },
});

export const ActivationCodeModel = model<ActivationCode>(DOCUMENT_NAME, schema, COLLECTION_NAME);
