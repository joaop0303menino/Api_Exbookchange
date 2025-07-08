import { RedisClientType } from "redis";
import APIErrorsHandler from "../helpers/APIErrors";
import { ConnectionCacheRedis } from "../models/connection-cache-redis"

export class CacheService {
    cacheRedis: ConnectionCacheRedis;
    private client: RedisClientType;

    constructor() {
        this.cacheRedis = ConnectionCacheRedis.getInstance();
        this.client = this.cacheRedis.getClient();
    };

    async hSetCache(key: string, values: {} | [], expirationTime?: number): Promise<Boolean> {
        const responseSet = await this.client.hSet(key, values);
        
        if (expirationTime) {
            const responseSetExpiration = await this.client.expire(key, expirationTime);
            
            if (!responseSetExpiration) {
                throw new APIErrorsHandler("Error setting expiration time", 500, {responseSetExpiration});
            };
        };
        
        if (responseSet === 0) {
            throw new APIErrorsHandler("Error setting cache", 500, {responseSet});
        }; 
        
        return true;
    };
    
    async setCache(key: string, values: string, expirationTime?: number): Promise<Boolean> {
        const responseSet = await this.client.set(key, values);
        
        if (expirationTime) {
            const responseSetExpiration = await this.client.expire(key, expirationTime);
            
            if (!responseSetExpiration) {
                throw new APIErrorsHandler("Error setting expiration time", 500, {responseSetExpiration});
            };
        };
        
        if (responseSet === null) {
            throw new APIErrorsHandler("Error setting cache", 500, {responseSet});
        }; 
        
        return true;
    };
    
    async hGetAllCache(key: string) {
        return await this.client.hGetAll(key);
    };
    
    async getCache(key: string) {
        return this.client.get(key);
    };
    
    async deleteByKeyCache(key: string) {
        return await this.client.del(key);
    };
};