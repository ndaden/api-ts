import { Response } from 'express';
import { ErrorType } from './ErrorType';
import {
    AccessTokenErrorResponse,
    AuthFailureResponse,
    BadRequestResponse,
    ForbiddenResponse,
    InternalErrorResponse,
    NotFoundResponse,
} from './FailureResponse';
import { environment } from '../config';

export abstract class ErrorBase extends Error {
    constructor(public type: ErrorType, public message: string = 'error') {
        super(type);
        // https://github.com/microsoft/TypeScript/issues/13965
        const trueProto = new.target.prototype;
        Object.setPrototypeOf(this, trueProto);
    }

    public static handle(err: ErrorBase, res: Response): Response {
        switch (err.type) {
            case ErrorType.BAD_TOKEN:
            case ErrorType.TOKEN_EXPIRED:
            case ErrorType.UNAUTHORIZED:
                return new AuthFailureResponse(err.message).send(res);
            case ErrorType.ACCESS_TOKEN:
                return new AccessTokenErrorResponse(err.message).send(res);
            case ErrorType.INTERNAL:
                return new InternalErrorResponse(err.message).send(res);
            case ErrorType.NOT_FOUND:
            case ErrorType.NO_ENTRY:
            case ErrorType.NO_DATA:
                return new NotFoundResponse(err.message).send(res);
            case ErrorType.BAD_REQUEST:
                return new BadRequestResponse(err.message).send(res);
            case ErrorType.FORBIDDEN:
                return new ForbiddenResponse(err.message).send(res);
            default: {
                let message = err.message;
                // Do not send failure message in production as it may send sensitive data
                if (environment === 'production') message = 'Something wrong happened.';
                return new InternalErrorResponse(message).send(res);
            }
        }
    }
}

export class AuthFailureError extends ErrorBase {
    constructor(message = 'Invalid Credentials') {
        super(ErrorType.UNAUTHORIZED, message);
    }
}

export class InternalError extends ErrorBase {
    constructor(message = 'Internal error') {
        super(ErrorType.INTERNAL, message);
    }
}

export class BadRequestError extends ErrorBase {
    constructor(message = 'Bad Request') {
        super(ErrorType.BAD_REQUEST, message);
    }
}

export class NotFoundError extends ErrorBase {
    constructor(message = 'Not Found') {
        super(ErrorType.NOT_FOUND, message);
    }
}

export class ForbiddenError extends ErrorBase {
    constructor(message = 'Permission denied') {
        super(ErrorType.FORBIDDEN, message);
    }
}

export class NoEntryError extends ErrorBase {
    constructor(message = "Entry don't exists") {
        super(ErrorType.NO_ENTRY, message);
    }
}

export class BadTokenError extends ErrorBase {
    constructor(message = 'Token is not valid') {
        super(ErrorType.BAD_TOKEN, message);
    }
}

export class TokenExpiredError extends ErrorBase {
    constructor(message = 'Token is expired') {
        super(ErrorType.TOKEN_EXPIRED, message);
    }
}

export class NoDataError extends ErrorBase {
    constructor(message = 'No data available') {
        super(ErrorType.NO_DATA, message);
    }
}

export class AccessTokenError extends ErrorBase {
    constructor(message = 'Invalid access token') {
        super(ErrorType.ACCESS_TOKEN, message);
    }
}
