import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';
import { BadRequestError } from '../core/ErrorBase';
import logger from './logger';

export enum ValidationSource {
    BODY = 'body',
    HEADER = 'headers',
    QUERY = 'query',
    PARAM = 'params',
}

export const JoiAuthBearer = () =>
    Joi.string().custom((value: string, helpers) => {
        if (!value.startsWith('Bearer ')) return helpers.error('any.invalid');
        if (!value.split(' ')[1]) return helpers.error('any.invalid');
        return value;
    }, 'Authorization Header Validation');

export default (schema: Joi.Schema, source: ValidationSource = ValidationSource.BODY) => (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const { error } = schema.validate(req[source]);
        if (!error) next();

        if (error) {
            const message = error.details.map((i) => i.message.replace(/['"]+/g, '')).join(',');
            logger.error(message);

            next(new BadRequestError(message));
        }
    } catch (e) {
        next(e);
    }
};
