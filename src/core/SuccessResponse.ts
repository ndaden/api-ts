import { ResponseBase } from "./ResponseBase";
import { ResponseStatus } from "./ResponseStatus";
import { StatusCode } from './StatusCode';

export class SuccessResponse extends ResponseBase {
    constructor(message: string) {
        super(StatusCode.SUCCESSFUL, ResponseStatus.OK, message);
    }
}