import { v4 as uuidv4 } from "uuid";

export class JWTClaims {
    userPhone = false;
    userPermissions: Record<string, string[]>;
    iss: string;       
    sub: string;        
    aud: string;        
    exp: number;        
    nbf: number;        
    iat: number;        
    jti: string;

    constructor(userId: number, userPhone: boolean, expiresInSeconds: number = 6000) {
        const now = Math.floor(Date.now() / 1000);

        this.userPhone = userPhone;
        this.userPermissions = this.userPhone ? {
            User: ["create", "read", "update", "delete"],
            UserSettings: ["create", "read", "update", "delete"],
            Announce: ["create", "read", "update", "delete"],
            Author: ["create", "read", "update", "delete"],
            ImagesBook: ["create", "read", "update", "delete"],
            ExchangeDonationHistoric: ["create", "read"],
            Profile: ["create", "read", "update"],
            Review: ["create", "read", "update", "delete"],
        } : {
            User: ["create", "read", "update", "delete"],
            UserSettings: ["create", "read", "update", "delete"],
            Announce: ["read"],
            Author: ["read"],
            Profile: ["create", "read", "update"],
            Review: ["create", "read", "update", "delete"],
        };
        this.iss = "https://api-exbookchange";       
        this.sub = userId.toString();        
        this.aud = "https://exbookchange";          
        this.iat = now;                      
        this.nbf = now;                      
        this.exp = now + expiresInSeconds;
        this.jti = uuidv4();
    }

    toPayload() {
        return {
            userPermissions: this.userPermissions,
            iss: this.iss,
            sub: this.sub,
            aud: this.aud,
            exp: this.exp,
            nbf: this.nbf,
            iat: this.iat,
            jti: this.jti,
        };
    };
};