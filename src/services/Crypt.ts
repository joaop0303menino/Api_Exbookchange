import bcrypt from "bcrypt";

export default class Crypt {
    private static readonly salt: number = 10;

    static async encrypt(text: string): Promise<string> {
        return await bcrypt.hash(text, Crypt.salt)
    };


    static async verifyEncrypt(text: string, textHash: string): Promise<boolean> {
        return await bcrypt.compare(text, textHash);
    };
};