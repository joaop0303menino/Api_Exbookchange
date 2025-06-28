import APIErrorsHandler from "../../../src/helpers/APIErrors";
import { User } from "../../../src/models/entities/User";
import TokenJWTService from "../../../src/services/TokenJWTService";

describe("JWT tests", () => {
    test("Should return access token jwt string", async () => {
        const user = new User();
        user.id = 1;
        
        if (user.phone === null || user.phone === undefined || user.phone === "") {
            var userPhone = false;
        } else {
            var userPhone = true;
        };
        
        const token = await TokenJWTService.generateAccessToken(user.id, userPhone);
        console.log(token);
        
        expect(token).not.toBe(1);
        expect(typeof token).toBe("string");
    });
    
    test("Should verify access token", async () => {
        const user = new User();
        user.id = 1;

        if (user.phone === null || user.phone === undefined || user.phone === "") {
            var userPhone = false;
        } else {
            var userPhone = true;
        };
        
        const token = await TokenJWTService.generateAccessToken(user.id, userPhone);

        const validate1 = await TokenJWTService.verifyToken(token)
        .then(decode => {return decode})
        .catch(err => {return err})
        
        const validate2 = await TokenJWTService.verifyToken("should.return.false-hdsa")
        .then(decode => {return decode})
        .catch(err => {return err})


        expect(validate1).not.toBeInstanceOf(APIErrorsHandler);
        expect(validate2).toBeInstanceOf(APIErrorsHandler);
    });

    test("Should return refresh token jwt string", async () => {
        const user = new User();
        user.id = 1;

        const token = await TokenJWTService.generateRefreshToken(user.id);
        console.log(token);
        
        expect(token).not.toBe(1);
        expect(typeof token).toBe("string");
    });
    
    test("Should verify refresh token", async () => {
        const user = new User();
        user.id = 1;
        
        const token = await TokenJWTService.generateRefreshToken(user.id);

        const validate1 = await TokenJWTService.verifyToken(token)
        .then(decode => {return decode})
        .catch(err => {return err})
        
        const validate2 = await TokenJWTService.verifyToken("should.return.false-hdsa")
        .then(decode => {return decode})
        .catch(err => {return err})


        expect(validate1).not.toBeInstanceOf(APIErrorsHandler);
        expect(validate1).toHaveProperty("id")
        expect(validate2).toBeInstanceOf(APIErrorsHandler);
    });
});