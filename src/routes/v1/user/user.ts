import express, { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import _ from 'lodash';
import { BadRequestError } from '../../../core/ErrorBase';
import { FailureResponse } from '../../../core/FailureResponse';
import { SuccessResponse } from '../../../core/SuccessResponse';
import UserRepository from '../../../data/repositories/UserRepository';
import User from '../../../data/model/User';
import { RoleCode } from '../../../data/model/RoleCode';
import AsyncHandler from '../../../core/AsyncHandler';
import validator from '../../../tools/validator';
import schema from './schema';
import authentication from '../../../middleware/authentication';
import role from '../../../middleware/role';
import authorization from '../../../middleware/authorization';

const router = express.Router();

/** ALL ROUTES HERE ARE PROTECTED BY ACCESS TOKEN AND ADMINISTRATOR ROLE */
router.use('/', authentication, role(RoleCode.ADMINISTRATOR), authorization);
/** ALL ROUTES HERE ARE PROTECTED BY ACCESS TOKEN AND ADMINISTRATOR ROLE */

async function getUsers(req: Request, res: Response) {
    const users = await UserRepository.getAllUsers();
    if (!users) throw new FailureResponse();
    new SuccessResponse('success', users).send(res);
}

async function createUser(req: Request, res: Response) {
    const foundByEmail = await UserRepository.findByEmail(req.body.email);
    if (foundByEmail) throw new BadRequestError('Email already registered');

    const foundByUsername = await UserRepository.findByUsername(req.body.username);
    if (foundByUsername) throw new BadRequestError('Username already registered');

    const passwordHash = await bcrypt.hash(req.body.password, 10);

    const { user: createdUser } = await UserRepository.create(
        {
            username: req.body.username,
            email: req.body.email,
            password: passwordHash,
        } as User,
        RoleCode.GUEST,
    );

    new SuccessResponse('Signup successful', {
        user: _.pick(createdUser, ['_id', 'username', 'email', 'avatarUrl']),
    }).send(res);
}

router.get('/', AsyncHandler(getUsers));
router.post('/', validator(schema.signup), AsyncHandler(createUser));

export default router;
