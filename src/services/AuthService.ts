import "dotenv/config";
import jwt, { Jwt, JwtPayload } from "jsonwebtoken";
import APIErrorsHandler from "../helpers/APIErrors";

export default class AuthService {
    static secretKey = process.env.SECRET_KEY!
    
    static generateToken(userId: number): string {
        return jwt.sign({id: userId},  AuthService.secretKey, {expiresIn: "1h"});
    };

    static async verifyToken(token: string): Promise<Jwt | JwtPayload | string> {
        if (!token.includes(".") || token.split(".").length !== 3) {
            throw new APIErrorsHandler("Token jwt malformated", 400, token)
        };

        return new Promise((resolve, reject) => {
            jwt.verify(token, AuthService.secretKey, (err, decode) => {
                if (err) {
                    return reject(new APIErrorsHandler("Invalid token", 401, err));
                };

                return resolve(decode as JwtPayload);
            });
        });
    };
};