import { Response } from 'express';
import { ResponseBase } from './ResponseBase';
import { ResponseStatus } from './ResponseStatus';
import { StatusCode } from './StatusCode';

export class AuthFailureResponse extends ResponseBase {
    constructor(message = 'Authentication Failure') {
        super(StatusCode.FAILURE, ResponseStatus.UNAUTHORIZED, message);
    }
}

export class NotFoundResponse extends ResponseBase {
    private url: string;

    constructor(message = 'Not Found') {
        super(StatusCode.FAILURE, ResponseStatus.NOT_FOUND, message);
        this.url = '';
    }

    send(res: Response): Response {
        this.url = res.req?.originalUrl || '';
        return super.prepare<NotFoundResponse>(res, this);
    }
}

export class ForbiddenResponse extends ResponseBase {
    constructor(message = 'Forbidden') {
        super(StatusCode.FAILURE, ResponseStatus.FORBIDDEN, message);
    }
}

export class BadRequestResponse extends ResponseBase {
    constructor(message = 'Bad Parameters') {
        super(StatusCode.FAILURE, ResponseStatus.BAD_REQUEST, message);
    }
}

export class InternalErrorResponse extends ResponseBase {
    constructor(message = 'Internal Error') {
        super(StatusCode.FAILURE, ResponseStatus.INTERNAL_ERROR, message);
    }
}

export class FailureResponse extends ResponseBase {
    constructor(message = 'technical error') {
        super(StatusCode.FAILURE, ResponseStatus.INTERNAL_ERROR, message);
    }
}

export class FailureMsgResponse extends ResponseBase {
    constructor(message: string) {
        super(StatusCode.FAILURE, ResponseStatus.SUCCESS, message);
    }
}

export class AccessTokenErrorResponse extends ResponseBase {
    private instruction = 'refresh_token';

    constructor(message = 'Access token invalid') {
        super(StatusCode.INVALID_ACCESS_TOKEN, ResponseStatus.UNAUTHORIZED, message);
    }

    send(res: Response): Response {
        res.setHeader('instruction', this.instruction);
        return super.prepare<AccessTokenErrorResponse>(res, this);
    }
}
