import express, { Request, Response } from 'express';

const router = express.Router();

function getHealth(req: Request, res: Response) {
    res.send({ success: true, status: 'healthy' });
}

router.get('/', getHealth);

export default router;
