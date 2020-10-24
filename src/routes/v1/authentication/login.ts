import express, { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import _ from 'lodash';
import { SuccessResponse } from '../../../core/SuccessResponse';
import AsyncHandler from '../../../core/AsyncHandler';
import UserRepository from '../../../data/repositories/UserRepository';
import { AuthFailureError, BadRequestError } from '../../../core/ErrorBase';
import validator from '../../../tools/validator';
import schema from './schema';
import { createTokens } from '../../../tools/authUtils';

const router = express.Router();

async function login(req: Request, res: Response) {
    const user = await UserRepository.findByUsername(req.body.username);
    if (!user) throw new BadRequestError('User not registered');
    if (!user.password) throw new BadRequestError('Credentials not set');

    const match = await bcrypt.compare(req.body.password, user.password);
    if (!match) throw new AuthFailureError('Authentication failure');

    const accessTokenKey = crypto.randomBytes(64).toString('hex');
    const refreshTokenKey = crypto.randomBytes(64).toString('hex');

    const tokens = await createTokens(user, accessTokenKey, refreshTokenKey);

    new SuccessResponse('Login successful', {
        user: _.pick(user, ['_id', 'username', 'email', 'avatarUrl']),
        tokens: tokens,
    }).send(res);
}

router.post('/', validator(schema.login), AsyncHandler(login));

export default router;
