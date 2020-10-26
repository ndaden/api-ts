import express from 'express';
import AsyncHandler from '../core/AsyncHandler';
import { AuthFailureError } from '../core/ErrorBase';
import { ProtectedRequest } from '../core/ProtectedRequest';
import RoleRepository from '../data/repositories/RoleRepository';

const router = express.Router();

export default router.use(
    AsyncHandler(async (req: ProtectedRequest, res, next) => {
        if (!req.user || !req.user.roles || !req.currentRoleCode) throw new AuthFailureError('Permission denied');

        const role = await RoleRepository.findByCode(req.currentRoleCode);
        if (!role) throw new AuthFailureError('Permission denied');

        const validRoles = req.user.roles.filter((userRole) => userRole._id.toHexString() === role._id.toHexString());

        if (!validRoles || validRoles.length == 0) throw new AuthFailureError('Permission denied');

        return next();
    }),
);
