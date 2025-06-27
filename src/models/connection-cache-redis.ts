import { createClient, RedisClientType } from "redis";
import APIErrorsHandler from "../helpers/APIErrors";

export class ConnectionCacheRedis {
    private client: RedisClientType;

    constructor() {
        this.client = createClient({url: process.env.URL_REDIS_CACHE, password: process.env.REDIS_PASSWORD});
    };

    async connect(): Promise<RedisClientType> {
        return await this.client.connect()
        .then(() => {return this.client})
        .catch((error) => {console.error({status: "error", message: error.message, details: error}); throw new APIErrorsHandler("Redis connection error", 500, error)});
    };

    async disconnect(): Promise<RedisClientType> {
        return await this.client.disconnect()
        .then(() => {return this.client})
        .catch((error) => {console.error({status: "error", message: error.message, details: error}); throw new APIErrorsHandler("Redis disconnection error", 500, error)});
    };
};