import bcrypt from "bcrypt";

export default class Crypt {
    private static readonly salt: number = 10;

    static async encryptPassword(passsword: string): Promise<string> {
        return await bcrypt.hash(passsword, Crypt.salt)
    };


    static async verifyEncryptPassword(passsword: string, hashPassword: string): Promise<boolean> {
        return await bcrypt.compare(passsword, hashPassword);
    };
};