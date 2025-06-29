import { AuthService } from "../services/AuthService";
import { Request, Response, NextFunction } from "express";

export default class AuthMiddleware {
    private readonly authService: AuthService;

    constructor() {
        this.authService = new AuthService();
    };

    async authenticate(req: Request, res: Response, next: NextFunction): Promise<void> {
        const accessToken = req.headers.authorization;
        
        await this.authService.accessToken(accessToken!);
        
        next();
    };
};