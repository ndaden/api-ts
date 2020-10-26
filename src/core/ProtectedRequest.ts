import { Request } from 'express';
import User from '../data/model/User';

export interface ProtectedRequest extends Request {
    user: User;
    currentRoleCode: string;
    accessToken: string;
}
