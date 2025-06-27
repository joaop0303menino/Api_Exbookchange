import { CacheService } from "../../../src/services/CacheService";
import Crypt from "../../../src/services/Crypt";
import TokenJWTService from "../../../src/services/TokenJWTService";

describe("CacheService tests", () => {
    let cacheService: CacheService;

    beforeAll(() => {
        cacheService = new CacheService();
    });

    test("Should set cache with object", async () => {
        const userId = 1;
        const refreshToken = TokenJWTService.generateRefreshToken(userId);
        const refreshTokenHash = await Crypt.encrypt(refreshToken);
        
        const expirationTime = 60 * 60 * 24 * 7;

        const redisValues = {
            userId: userId.toString(),
            refreshTokenHash: refreshTokenHash,
            expirationTime: expirationTime.toString()
        };

        const response = await cacheService.hSetCache(userId.toString(), redisValues, expirationTime);

        expect(response).toBe(true);
    });

    test("Should set cache with string", async () => {
        const response = await cacheService.setCache("testKey", "testValue", 20);

        expect(response).toBe(true);
    });

    test("Should get cache with string", async () => {
        const responseGet = await cacheService.getCache("testKey");
        console.log({responseGet});

        expect(responseGet).toBe("testValue");
    });

    test("Should get cache with object", async () => {
        const userId = 1;

        const response = await cacheService.hGetAllCache(userId.toString());
        console.log({response});

        expect(response).toBeDefined();
        expect(response.userId).toBeDefined();
        expect(response.refreshTokenHash).toBeDefined();
        expect(response.expirationTime).toBeDefined();
    });
});