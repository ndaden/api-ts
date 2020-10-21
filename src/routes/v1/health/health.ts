import express, { Request, Response } from 'express';
import { SuccessResponse } from '../../../core/SuccessResponse';

const router = express.Router();

function getHealth(req: Request, res: Response) {
    return new SuccessResponse('Youhou !').send(res);
}

router.get('/', getHealth);

export default router;
