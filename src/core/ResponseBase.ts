import { Response } from 'express';
import { ResponseStatus } from './ResponseStatus';
import { StatusCode } from './StatusCode';

export abstract class ResponseBase {
    constructor(protected statusCode: StatusCode, protected status: ResponseStatus, protected message: string){}

    private static sanitize<T extends ResponseBase>(response: T): T {
        const clone: T = <T>{};
        Object.assign(clone, response);
        // delete {some_field};
        //delete clone.status;
        for (const i in clone) if (typeof clone[i] === 'undefined') delete clone[i];
        return clone;
    }

    protected prepare<T extends ResponseBase>(res: Response, response: T): Response {
        return res.status(this.status).json(ResponseBase.sanitize(response));
    }

    public send(res: Response): Response {
        return this.prepare<ResponseBase>(res, this);
    }
}
