import { Request, Response } from "express";
import { SignUpUserRequestBodyDTO,SignInUserRequesBodytDTO, SignOutUserRequestBodyDTO, SignOutUserRequestHeadersDTO } from "../dtos/entities/UserRequestDTO";
import { BadRequestError, InternalServerError } from "../helpers/APIErrors";
import { UserService } from "../services/UserService";
import { AuthService } from "../services/AuthService";
import { APIBody } from "../dtos/APIBody";
import { APIHeaders } from "../dtos/APIHeaders";
import { UserZodService } from "../services/UserZodService";
import { User } from "../models/entities/User";
import { CryptService } from "../services/CryptService";

export class AuthController {
    private readonly userService: UserService;
    private readonly authService: AuthService;

    constructor() {
        this.userService = new UserService();
        this.authService = new AuthService();
    };

    async signIn(req: Request, res: Response) {
        const { email, password }: SignInUserRequesBodytDTO = req.body;

        if (!email || !password) {
            throw new BadRequestError("Email and password are required");
        };

        const { accessToken, refreshTokenHash } = await this.authService.signIn(email, password);

        const headers = APIHeaders.fullHeaders(accessToken, "http://localhost:3000");
        const body = new APIBody("success", "Sign in held successfully", {grant_type: refreshTokenHash});
        
        return res.status(200).header(headers).json(body);
    };

    async signUp(req: Request, res: Response) {
        const userData: SignUpUserRequestBodyDTO = req.body;
        
        const validatedUserData = await UserZodService.validateUser(userData);

        if (validatedUserData.error) {
            throw new BadRequestError(validatedUserData.error.errors.map(error => `${error.path} is ${error.message}`).join(", "), validatedUserData.error);
        };

        const passwordHash = await CryptService.encrypt(userData.password);

        if (!passwordHash) {
            throw new InternalServerError("Error encrypting password");
        };

        const user = new User()

        user.full_name = userData.full_name;
        user.date_birth = new Date(userData.date_birth);
        user.email = userData.email;
        user.password = passwordHash;
        user.phone = userData.phone;

        const createdUser = await this.userService.createUser(user);
        
        if (!createdUser) {
            throw new InternalServerError("Error creating user");
        };
        
        const headers = APIHeaders.fullHeaders(undefined, "http://localhost:3000");
        const body = new APIBody("success", "Sign up held successfully", {user: createdUser});

        return res.status(201).header(headers).json(body);
    };
    
    async signOut(req: Request, res: Response) {
        const authorization: SignOutUserRequestHeadersDTO = { accessToken: req.headers.authorization};
        const grant_type: SignOutUserRequestBodyDTO = { refreshTokenHash: req.body.grant_type };
        
        if (!authorization.accessToken) {
            throw new BadRequestError("Access token in headers is required");
        };

        if (!authorization.accessToken.includes("Bearer ")) {
            throw new BadRequestError("Access token in headers must be in Bearer format");
        };

        if (!grant_type.refreshTokenHash) {
            throw new BadRequestError("Refresh token in headers is required");
        };

        const accessToken = authorization.accessToken.replace("Bearer ", "");

        const signOut = await this.authService.signOut(accessToken, grant_type.refreshTokenHash);
        
        if (!signOut) {
            throw new InternalServerError("Error signing out");
        }

        const headers = APIHeaders.fullHeaders(undefined, "http://localhost:3000");
        const body = new APIBody("success", "Sign out held successfully");
    
        return res.status(200).header(headers).json(body);
    };

    async refreshToken(req: Request, res: Response) {
        const grant_type: SignOutUserRequestBodyDTO = { refreshTokenHash: req.body.grant_type };

        if (!grant_type.refreshTokenHash) {
            throw new BadRequestError("Refresh token in body in parameter grant_type is required");
        };

        const { accessToken, refreshTokenHash } = await this.authService.refreshToken(grant_type.refreshTokenHash);

        const headers = APIHeaders.fullHeaders(accessToken, "http://localhost:3000");
        const body = new APIBody("success", "Access token and new refresh token generated successfully", {grant_type: refreshTokenHash});

        return res.status(200).header(headers).json(body);
    };
};