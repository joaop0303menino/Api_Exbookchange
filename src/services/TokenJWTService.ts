import "dotenv/config";
import jwt, { Jwt, JwtPayload } from "jsonwebtoken";
import APIErrorsHandler from "../helpers/APIErrors";
import { JWTClaims } from "../dtos/JWTClaims";

export default class TokenJWTService {
    static secretKey = process.env.SECRET_KEY!
    
    static generateAccessToken(userId: number, userPhone: boolean): string {
        const claims = new JWTClaims(userId, userPhone, 20);
        
        return jwt.sign(claims.toPayload(), TokenJWTService.secretKey);
    };
    
    static generateRefreshToken(userId: number): string {
        return jwt.sign({id: userId}, TokenJWTService.secretKey, {expiresIn: "15d"});
    };

    static async verifyToken(token: string): Promise<Jwt | JwtPayload | string> {
        if (!token.includes(".") || token.split(".").length !== 3) {
            throw new APIErrorsHandler("Token jwt malformated", 400, token)
        };

        return new Promise((resolve, reject) => {
            jwt.verify(token, TokenJWTService.secretKey, (err, decode) => {
                if (err) {
                    return reject(new APIErrorsHandler("Invalid token", 401, err));
                };

                return resolve(decode as JwtPayload);
            });
        });
    };
};