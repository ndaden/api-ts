enum StatusCode {
    SUCCESS = 10000,
    FAILURE = 10001,
}

enum ResponseStatus {
    SUCCESS = 200,
    NOT_FOUND = 404,
    INTERNAL_ERROR = 500,
}

abstract class ApiResponse {
    constructor(protected statusCode: StatusCode, protected status: ResponseStatus, protected message: string) {}
}

export class NotFoundResponse extends ApiResponse {
    constructor(message = 'Not found') {
        super(StatusCode.FAILURE, ResponseStatus.NOT_FOUND, message);
    }
}
