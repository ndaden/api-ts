import { Response } from 'express';
import { ResponseBase } from './ResponseBase';
import { ResponseStatus } from './ResponseStatus';
import { StatusCode } from './StatusCode';

export class SuccessMsgResponse extends ResponseBase {
    constructor(message: string) {
        super(StatusCode.SUCCESS, ResponseStatus.SUCCESS, message);
    }
}

export class SuccessResponse<T> extends ResponseBase {
    constructor(message: string, private data: T) {
        super(StatusCode.SUCCESS, ResponseStatus.SUCCESS, message);
    }

    send(res: Response): Response {
        return super.prepare<SuccessResponse<T>>(res, this);
    }
}

export class TokenRefreshResponse extends ResponseBase {
    constructor(message: string, private accessToken: string, private refreshToken: string) {
        super(StatusCode.SUCCESS, ResponseStatus.SUCCESS, message);
    }

    send(res: Response): Response {
        return super.prepare<TokenRefreshResponse>(res, this);
    }
}
