import { JWTClaims } from "../../../src/dtos/JWTClaims";

describe("JWTClaims tests", () => {
    test("Should return a valid payload", () => {
        const jwtClaims = new JWTClaims(1, true, 20);

        const payload = jwtClaims.toPayload();

        console.log(payload);

        expect(payload).toEqual({
            userPermissions: {
                User: ["create", "read", "update", "delete"],
                UserSettings: ["create", "read", "update", "delete"],
                Announce: ["create", "read", "update", "delete"],
                Author: ["create", "read", "update", "delete"],
                ImagesBook: ["create", "read", "update", "delete"],
                ExchangeDonationHistoric: ["create", "read"],
                Profile: ["create", "read", "update"],
                Review: ["create", "read", "update", "delete"],
            },
            iss: "https://api-exbookchange",
            sub: "1",
            aud: "https://exbookchange",
            exp: expect.any(Number),
            nbf: expect.any(Number),
            iat: expect.any(Number),
            jti: expect.any(String)
        });
    });
});