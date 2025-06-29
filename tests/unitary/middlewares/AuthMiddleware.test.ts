import { jest } from '@jest/globals';
import { Request, Response, NextFunction } from "express";
import AuthMiddleware from "../../../src/middlewares/AuthMiddleware";
import { BadRequestError, UnauthorizedError } from '../../../src/helpers/APIErrors';

jest.mock("../../../src/services/AuthService", () => {
    return {
        AuthService: jest.fn().mockImplementation(() => ({
            accessToken: jest.fn()
        }))
    };
});

describe("AuthMiddleware tests", () => {
    let req: Partial<Request>;
    let res: Partial<Response>;
    let next: jest.Mock;
    let authMiddleware: AuthMiddleware;

    beforeEach(() => {
        req = { headers: {}};
        res = {};
        next = jest.fn();
        authMiddleware = new AuthMiddleware();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test("Should call next middleware if user is authenticated", async () => {
        const mockedAccessToken = authMiddleware["authService"].accessToken as jest.MockedFunction<typeof authMiddleware["authService"]["accessToken"]>;
        mockedAccessToken.mockResolvedValue(true);
        
        req.headers!.authorization = "validToken";
        
        await authMiddleware.authenticate(req as Request, res as Response, next as NextFunction);
        
        expect(next).toHaveBeenCalled();
    });
    
    test("Should throw BadRequestError when access token is missing", async () => {
        (authMiddleware["authService"].accessToken as jest.Mock).mockImplementation(() => {
            throw new BadRequestError("Access token is required");
        });
        
        req.headers!.authorization = undefined;
        
        await expect(
            authMiddleware.authenticate(req as Request, res as Response, next as NextFunction)
        ).rejects.toBeInstanceOf(BadRequestError);
        
        expect(next).not.toHaveBeenCalled();
    });
    
    test("Should throw UnauthorizedError when access token is invalid", async () => {
        (authMiddleware["authService"].accessToken as jest.Mock).mockImplementation(() => {
            throw new UnauthorizedError("Invalid access token");
        });

        req.headers!.authorization = "invalidToken";

        await expect(
            authMiddleware.authenticate(req as Request, res as Response, next as NextFunction)
        ).rejects.toBeInstanceOf(UnauthorizedError);

        expect(next).not.toHaveBeenCalled();
    });
});