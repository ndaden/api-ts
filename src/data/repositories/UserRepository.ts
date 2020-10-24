import _ from 'lodash';
import { Types } from 'mongoose';
import User, { UserModel } from '../model/User';
import { RoleModel } from '../model/Role';
import { ActivationCodeModel } from '../model/ActivationCode';

import { InternalError } from '../../core/ErrorBase';

export default class UserRepository {
    public static getAllUsers(): Promise<User[]> {
        return UserModel.find().populate('activationCode roles').lean<User>().exec();
    }
    public static findById(id: Types.ObjectId): Promise<User | null> {
        return UserModel.findOne({ _id: id }).populate('activationCode roles').lean<User>().exec();
    }
    public static findByUsername(username: string): Promise<User | null> {
        return UserModel.findOne({ username: username }).select('+username').lean<User>().exec();
    }
    public static findByEmail(email: string): Promise<User | null> {
        return UserModel.findOne({ email: email }).select('+email').lean<User>().exec();
    }
    public static async create(user: User, roleCode: string): Promise<{ user: User }> {
        const now = new Date();

        const role = await RoleModel.findOne({ roleCode: roleCode });
        if (!role) throw new InternalError('role must be defined');

        const activationCode = this.generateActivationCode(6);
        const createdActivationCode = await ActivationCodeModel.create({
            validationCode: activationCode,
            validationCodeSendDate: now,
            validationCodeExpirationDate: new Date(now.getTime() + 30 * 60000),
        });

        if (!activationCode) throw new InternalError('could not create activationCode');

        user.roles = [role._id];
        user.activationCode = createdActivationCode._id;
        user.createdAt = user.updatedAt = now;
        const createdUser = await UserModel.create(user);
        return { user: createdUser };
    }
    public static async update(user: User): Promise<{ user: User }> {
        user.updatedAt = new Date();
        await UserModel.updateOne({ _id: user._id }, { $set: { ...user } });
        return { user: user };
    }

    private static generateActivationCode(length: number): string {
        let code = '';
        const alphaNum = 'ABCDEFGHIJKLMNOPQRSTUVWXY1234567890';
        for (let i = 0; i < length; i++) {
            code = `${code}${alphaNum.substr(Math.random() * alphaNum.length, 1)}`;
        }
        return code;
    }
}
