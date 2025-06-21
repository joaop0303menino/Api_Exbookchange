export default class APIErrorsHandler extends Error {
    public readonly statusCode: number;
    public readonly details?: string | [] | object;
    
    constructor(mensagem: string, statusCode: number, details?: string | [] | object) {
        super(mensagem);
        this.statusCode = statusCode;
        this.details = details;
    };
};

export class ConflictError extends APIErrorsHandler {
    constructor(message: string, details?: string | [] | object) {
        super(message, 409, details);
    };
};

export class NotFoundError extends APIErrorsHandler {
    constructor(message: string, details?: string | [] | object) {
        super(message, 404, details);
    };
};

export class BadRequestError extends APIErrorsHandler {
    constructor(message: string, details?: string | [] | object) {
        super(message, 400, details);
    };
};