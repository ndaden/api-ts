import { Response, NextFunction } from 'express';
import { RoleCode } from '../data/model/RoleCode';

export default (roleCode: RoleCode) => (req: any, res: Response, next: NextFunction) => {
    req.currentRoleCode = roleCode;
    next();
};
