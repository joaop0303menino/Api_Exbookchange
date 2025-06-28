import CryptService from "../../../src/services/CryptService";

describe("Encrypt test", () => {
  test("should return an encrypted string", async () => {
    const password: string = "Hello.world1234";

    const encrypted = await CryptService.encrypt(password);

    expect(encrypted).not.toBe(password);
    expect(typeof encrypted).toBe("string");
  });

  test("should verify the encrypted password", async () => {
    const password1: string = "Hello.world1234";
    const password2: string = "Hello.world12";

    const encrypted = await CryptService.encrypt(password1);
    const validate1 = await CryptService.verifyEncrypt(password2, encrypted);
    const validate2 = await CryptService.verifyEncrypt(password1, encrypted);

    expect(validate1).toBe(false);
    expect(validate2).toBe(true);
  });
});
