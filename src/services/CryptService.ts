import bcrypt from "bcrypt";

export class CryptService {
    private static readonly salt: number = 10;

    static async encrypt(text: string): Promise<string> {
        return await bcrypt.hash(text, CryptService.salt)
    };


    static async verifyEncrypt(text: string, textHash: string): Promise<boolean> {
        return await bcrypt.compare(text, textHash);
    };
};