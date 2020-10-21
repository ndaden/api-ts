import { ResponseBase } from './ResponseBase';
import { ResponseStatus } from './ResponseStatus';
import { StatusCode } from './StatusCode';

export class FailureResponse extends ResponseBase {
    constructor(message = 'technical error') {
        super(StatusCode.FAILURE, ResponseStatus.TECHNICAL_ERROR, message);
    }
}