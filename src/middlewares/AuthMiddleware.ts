import { AuthMiddlewareUserRequestHeadersDTO } from "../dtos/entities/UserRequestDTO";
import { BadRequestError, InternalServerError, UnauthorizedError } from "../helpers/APIErrors";
import { AuthService } from "../services/AuthService";
import { Request, Response, NextFunction } from "express";
import { CacheService } from "../services/CacheService";
import CryptService from "../services/CryptService";

export default class AuthMiddleware {
    private readonly authService: AuthService;
    private readonly cacheService: CacheService;

    constructor() {
        this.authService = new AuthService();
        this.cacheService = new CacheService();
    };

    async authenticate(req: Request, res: Response, next: NextFunction): Promise<void> {
        const authorization: AuthMiddlewareUserRequestHeadersDTO = { accessToken: req.headers.authorization };
        
        if (!authorization.accessToken) {
            throw new BadRequestError("Access token is required");
        };
        
        await this.authService.accessToken(authorization.accessToken!);

        const accessTokenHash = await CryptService.encrypt(authorization.accessToken);

        if (!accessTokenHash) {
            throw new InternalServerError("Error encrypting access token");
        };

        const invalidAccessToken = await this.cacheService.hGetAllCache(accessTokenHash);

        if (Object.keys(invalidAccessToken).length < 0) {
            throw new UnauthorizedError("Invalid access token");
        };
        
        next();
    };
};