import { response, Response } from 'express';
import { ErrorType } from './ErrorType';
import ResponseBase from './ResponseBase';

export abstract class ErrorBase extends Error {
    constructor(public type: ErrorType, public message: string = 'error'){
        super(type);
    }

    public static handle(err: ErrorBase, res: Response) : Response {
        switch(err.type) {
            case ErrorType.BAD_REQUEST:
                return ;
        }

    }

}