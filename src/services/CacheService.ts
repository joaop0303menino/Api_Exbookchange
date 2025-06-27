import APIErrorsHandler from "../helpers/APIErrors";
import { ConnectionCacheRedis } from "../models/connection-cache-redis"

export class CacheService {
    private cacheRedis: ConnectionCacheRedis;

    constructor() {
        this.cacheRedis = new ConnectionCacheRedis();
    };

    async hSetCache(key: string, values: {} | [], expirationTime?: number): Promise<Boolean> {
        await this.cacheRedis.connect();
        
        const responseSet = await this.cacheRedis.client.hSet(key, values);
        
        if (expirationTime) {
            const responseSetExpiration = await this.cacheRedis.client.expire(key, expirationTime);

            if (!responseSetExpiration) {
                throw new APIErrorsHandler("Error setting expiration time", 500, {responseSetExpiration});
            };
        };

        if (responseSet === 0) {
            throw new APIErrorsHandler("Error setting cache", 500, {responseSet});
        }; 
        
        await this.cacheRedis.disconnect();

        return true;
    };

    async setCache(key: string, values: string, expirationTime?: number): Promise<Boolean> {
        await this.cacheRedis.connect();
        
        const responseSet = await this.cacheRedis.client.set(key, values);
        
        if (expirationTime) {
            const responseSetExpiration = await this.cacheRedis.client.expire(key, expirationTime);
            
            if (!responseSetExpiration) {
                throw new APIErrorsHandler("Error setting expiration time", 500, {responseSetExpiration});
            };
        };

        if (responseSet === null) {
            throw new APIErrorsHandler("Error setting cache", 500, {responseSet});
        }; 
        
        await this.cacheRedis.disconnect();

        return true;
    };
    
    async hGetAllCache(key: string) {
        await this.cacheRedis.connect();

        const response = await this.cacheRedis.client.hGetAll(key);
        
        await this.cacheRedis.disconnect();
        
        return response;
    };
    
    async getCache(key: string) {
        await this.cacheRedis.connect();

        const response = await this.cacheRedis.client.get(key);
        
        await this.cacheRedis.disconnect();
        
        return response;
    };
};