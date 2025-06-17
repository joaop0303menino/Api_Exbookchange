import APIErrorsHandler from "../../../src/helpers/APIErrors";
import { User } from "../../../src/models/entities/User";
import AuthService from "../../../src/services/AuthService";

describe("JWT tests", () => {
    test("Should return token jwt string", async () => {
        const user = new User();
        user.id = 1;

        const token = await AuthService.generateToken(user.id);
        
        expect(token).not.toBe(1);
        expect(typeof token).toBe("string");
    });
    
    test("Should verify token", async () => {
        const user = new User();
        user.id = 1;
        
        const token = await AuthService.generateToken(user.id);

        const validate1 = await AuthService.verifyToken(token)
        .then(decode => {return decode})
        .catch(err => {return err})
        
        const validate2 = await AuthService.verifyToken("should.return.false-hdsa")
        .then(decode => {return decode})
        .catch(err => {return err})


        expect(validate1).not.toBeInstanceOf(APIErrorsHandler);
        expect(validate2).toBeInstanceOf(APIErrorsHandler);
    });
});