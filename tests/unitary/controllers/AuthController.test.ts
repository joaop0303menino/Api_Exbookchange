import { jest } from "@jest/globals";
import { Request, Response } from "express";
import { AuthController } from "../../../src/controllers/AuthController";
import { User } from "../../../src/models/entities/User";
import { SignUpUserRequestBodyDTO } from "../../../src/dtos/entities/UserRequestDTO";
import { Profile } from "../../../src/models/entities/Profile";
import { UserSetting } from "../../../src/models/entities/User_setting";

const mockGetUserByEmail = jest.fn();
const mockCreateUser = jest.fn();
const mockSignIn = jest.fn();
const mockSignOut = jest.fn();
const mockAccessToken = jest.fn();
const mockRefreshToken = jest.fn();

jest.mock("../../../src/services/AuthService", () => {
    return {
        AuthService: jest.fn().mockImplementation(() => ({
            signIn: mockSignIn,
            signOut: mockSignOut,
            accessToken: mockAccessToken,
            refreshToken: mockRefreshToken,
        }))
    };
});

jest.mock("../../../src/services/UserService", () => {
    return {
        UserService: jest.fn().mockImplementation(() => ({
            createUser: mockCreateUser,
            getUserByEmail: mockGetUserByEmail,
        }))
    };
});

describe("AuthController tests", () => {
    let req: Partial<Request>;
    let res: Partial<Response>;
    let mockStatus: jest.Mock;
    let mockHeader: jest.Mock;
    let mockJson: jest.Mock;
    let authController: AuthController;

    beforeEach(() => {
        req = { headers: {}, body: {}};
        
        mockStatus = jest.fn().mockReturnThis();
        mockHeader = jest.fn().mockReturnThis();
        mockJson = jest.fn().mockReturnThis();
        
        res = {
            status: mockStatus as any,
            header: mockHeader as any,
            json: mockJson as any
        };

        authController = new AuthController();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test("Should call the method signIn and return in response the access token and refresh token hash", async () => {
        const mockedGetByEmail = authController["userService"].getUserByEmail as jest.MockedFunction<typeof authController["userService"]["getUserByEmail"]>;
        mockedGetByEmail.mockResolvedValue(
            {full_name: "John Doe",
            email: "john.doe@example.com",
            password: "password",
            date_birth: new Date("01/01/2001"),
            created_at: new Date(),
            updated_at: new Date(),
            phone: "40028922"} as User);
        const mockedSignIn = authController["authService"].signIn as jest.MockedFunction<typeof authController["authService"]["signIn"]>;
        mockedSignIn.mockResolvedValue({accessToken: "validToken", refreshTokenHash: "validHash"});

        req.body = {email: "test@example.com", password: "password"};

        await authController.signIn(req as Request, res as Response)
        
        expect(res).toBeDefined();
        expect(mockSignIn).toHaveBeenCalledWith("test@example.com", "password");
        expect(mockStatus).toHaveBeenCalledWith(200);

        expect(mockHeader).toHaveBeenCalledWith(
            expect.objectContaining({
                'Authorization': 'Bearer validToken'
            })
        );
        
        expect(mockJson).toHaveBeenCalledWith(
            expect.objectContaining({
                data: {
                    grant_type: "validHash"
                }, 
                message: "Sign in held successfully", 
                status: "success"
            })
        );
    }); 

    test("Should call the method signUp and return in response the user data", async () => {
        const user: SignUpUserRequestBodyDTO = {
            full_name: "John Doe",
            email: "john.doe@gmail.com",
            password: "Password_123",
            date_birth: "01/01/2001",
            phone: "1140028922"
        };
        
        const newProfile = new Profile();
        const newUserSetting = new UserSetting();

        const userResponse: User = {
            id: 1,
            full_name: user.full_name,
            email: user.email,
            password: user.password,
            date_birth: new Date("01/01/2001"),
            created_at: new Date(),
            updated_at: new Date(),
            phone: user.phone,
            trust_seal: 0,
            blocked_user: 0,
            profile: newProfile,
            setting: newUserSetting,
            announces: [],
            exchangeDonations: [],
            Notifications: [],
            UserPreferences: [],
            Complaints: []
        };

        const mockedCreateUser = authController["userService"].createUser as jest.MockedFunction<typeof authController["userService"]["createUser"]>;
        mockedCreateUser.mockResolvedValue(userResponse);
        
        req.body = user;
        
        await authController.signUp(req as Request, res as Response);
        
        expect(mockCreateUser).toHaveBeenCalled();
        expect(mockStatus).toHaveBeenCalledWith(201);
        expect(mockJson).toHaveBeenCalledWith(
            expect.objectContaining({
                data: {
                    user: {
                        id: 1,
                        full_name: user.full_name,
                        email: user.email,
                        password: user.password,
                        date_birth: new Date("01/01/2001"),
                        created_at: expect.any(Date),
                        updated_at: expect.any(Date),
                        phone: user.phone,
                        trust_seal: 0,
                        blocked_user: 0,
                        profile: newProfile,
                        setting: newUserSetting,
                        announces: [],
                        exchangeDonations: [],
                        Notifications: [],
                        UserPreferences: [],
                        Complaints: []
                    }
                },
                message: "Sign up held successfully",
                status: "success"
            })
        );
    });

    test("Should call the method signOut and return in response the success message", async () => {
        const mockedSignOut = authController["authService"].signOut as jest.MockedFunction<typeof authController["authService"]["signOut"]>;
        mockedSignOut.mockResolvedValue(true);
        
        req.headers = {authorization: "Bearer validToken"};
        req.body = {grant_type: "refresh_token"};
        
        await authController.signOut(req as Request, res as Response);

        expect(mockedSignOut).toHaveBeenCalled();
        expect(mockStatus).toHaveBeenCalledWith(200);
        expect(mockJson).toHaveBeenCalledWith(
            expect.objectContaining({
                status: "success",
                message: "Sign out held successfully"
            }));
    });

    test("Should call the method refreshToken and return in response body the refresh token and return in response header the access token", async () => {
        const mockedRefreshToken = authController["authService"].refreshToken as jest.MockedFunction<typeof authController["authService"]["refreshToken"]>;
        mockedRefreshToken.mockResolvedValue({accessToken: "validToken", refreshTokenHash: "validHash"});

        req.body = {grant_type: "refresh_token"};

        await authController.refreshToken(req as Request, res as Response);

        expect(mockedRefreshToken).toHaveBeenCalled();
        expect(mockStatus).toHaveBeenCalledWith(200);
        expect(mockJson).toHaveBeenCalledWith(
            expect.objectContaining({
                data: {
                    grant_type: "validHash"
                }, 
                message: "Access token and new refresh token generated successfully", 
                status: "success"
            })
        );
        expect(mockHeader).toHaveBeenCalledWith(
            expect.objectContaining({
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': "http://localhost:3000",
                'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                'Authorization': 'Bearer validToken'
            })
        );
    });
});