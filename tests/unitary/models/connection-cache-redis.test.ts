import { ConnectionCacheRedis } from "../../../src/models/connection-cache-redis";

describe("ConnectionCacheRedis test", () => {
    let redis: ConnectionCacheRedis;

    beforeAll(() => {
        redis = new ConnectionCacheRedis();
    });

    test("Should connect to Redis", async () => {
        const connection = await redis.connect();

        expect(connection).toBeDefined();
        expect(connection.isOpen).toBeTruthy();
    });

    test("Should disconnect to Redis", async () => {

        const disconnection = await redis.disconnect();

        expect(disconnection).toBeDefined();
        expect(disconnection.isOpen).toBeFalsy();
    });
});