import { Request, Response, NextFunction } from 'express';

type AsyncFunction = (req: any, res: Response, next: NextFunction) => Promise<any>;

export default (execution: AsyncFunction) => (req: Request, res: Response, next: NextFunction) => {
    execution(req, res, next).catch(next);
};
