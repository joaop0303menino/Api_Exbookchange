export class APIBody<TypeData = any> {
    status: string;
    message: string;
    data?: TypeData;

    constructor(status: string, message: string, data?: TypeData) {
        this.status = status;
        this.message = message;
        this.data = data;
    }
};