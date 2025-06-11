export default class APIErrorsHandler extends Error {
    public readonly statusCode: number;
    public readonly details?: string | [] | object;
    
    constructor(mensagem: string, statusCode: number, details?: string | [] | object) {
        super(mensagem);
        this.statusCode = statusCode;
        this.details = details;
    };
};