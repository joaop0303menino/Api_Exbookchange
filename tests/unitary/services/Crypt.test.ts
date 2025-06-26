import Crypt from "../../../src/services/Crypt";

describe("Encrypt test", () => {
    test("should return an encrypted string", async () => {
        const password: string = "Hello.world1234";
        
        const encrypted = await Crypt.encrypt(password);
        
        expect(encrypted).not.toBe(password);
        expect(typeof encrypted).toBe("string");
    });
    
    test("should verify the encrypted password", async () => {
        const password1: string = "Hello.world1234";
        const password2: string = "Hello.world12";
        
        const encrypted = await Crypt.encrypt(password1);
        const validate1 = await Crypt.verifyEncrypt(password2, encrypted);
        const validate2 = await Crypt.verifyEncrypt(password1, encrypted);
        
        expect(validate1).toBe(false);
        expect(validate2).toBe(true);
    });
});