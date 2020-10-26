import express from 'express';
import { Types } from 'mongoose';
import AsyncHandler from '../core/AsyncHandler';
import { AccessTokenError, AuthFailureError, TokenExpiredError } from '../core/ErrorBase';
import JWT from '../core/JWT';
import { ProtectedRequest } from '../core/ProtectedRequest';
import UserRepository from '../data/repositories/UserRepository';
import { getAccessToken, validateTokenData } from '../tools/authUtils';
import validator, { ValidationSource } from '../tools/validator';
import schema from './schema';

const router = express.Router();

export default router.use(
    validator(schema.auth, ValidationSource.HEADER),
    AsyncHandler(async (req: ProtectedRequest, res, next) => {
        req.accessToken = getAccessToken(req.headers.authorization || '');
        try {
            const payload = await JWT.validate(req.accessToken);
            validateTokenData(payload);

            const user = await UserRepository.findById(new Types.ObjectId(payload.sub));
            if (!user) throw new AuthFailureError('User not registered');
            req.user = user;
            return next();
        } catch (e) {
            if (e instanceof TokenExpiredError) throw new AccessTokenError(e.message);
            throw e;
        }
    }),
);
