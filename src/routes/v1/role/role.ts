import express, { Request, Response } from 'express';
import { FailureResponse } from '../../../core/FailureResponse';
import { SuccessResponse } from '../../../core/SuccessResponse';
import AsyncHandler from '../../../core/AsyncHandler';
import RoleRepository from '../../../data/repositories/RoleRepository';

const router = express.Router();

async function getRoles(req: Request, res: Response) {
    const roles = await RoleRepository.getAllRoles();
    if (!roles) throw new FailureResponse();
    new SuccessResponse('success', roles).send(res);
}

router.get('/', AsyncHandler(getRoles));

export default router;
