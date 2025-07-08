import 'dotenv/config';
import { createClient, RedisClientType } from "redis";
import APIErrorsHandler from "../helpers/APIErrors";

export class ConnectionCacheRedis {
    private static instance: ConnectionCacheRedis;
    private client: RedisClientType;
    private isConnect: boolean = false;

    constructor() {
        this.client = createClient({url: process.env.URL_REDIS_CACHE!});
    };

    static getInstance(): ConnectionCacheRedis {
        if (!ConnectionCacheRedis.instance) {
            ConnectionCacheRedis.instance = new ConnectionCacheRedis();
        };
        return ConnectionCacheRedis.instance;
    };

    public getClient(): RedisClientType {
        return this.client;
    };

    async connect(): Promise<RedisClientType> {
        if (!this.isConnect) {
            return await this.client.connect()
            .then(() => {
                this.isConnect = true;
                return this.client;
            })
            .catch((error) => {console.error({status: "error", message: error.message, details: error}); throw new APIErrorsHandler("Redis connection error", 500, error)});
        };
        
        return this.client;
    };

    async disconnect(): Promise<void> {
        if (this.isConnect) {
            return await this.client.disconnect()
            .then(() => {
                this.isConnect = false;
                return;
            })
            .catch((error) => {console.error({status: "error", message: error.message, details: error}); throw new APIErrorsHandler("Redis disconnection error", 500, error)});
        };
        
        return;
    };
};