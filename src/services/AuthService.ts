import "dotenv/config";
import jwt, { Jwt, JwtPayload } from "jsonwebtoken";
import { User } from "../models/entities/User";

export default class AuthService {
    static secretKey = process.env.SECRET_KEY!
    
    static generateToken(userId: number): string {
        return jwt.sign({id: userId},  AuthService.secretKey, {expiresIn: "1h"});
    };

    static verifyToken(token: string): Jwt | JwtPayload | string {
        return jwt.verify(token, AuthService.secretKey);
    };
};