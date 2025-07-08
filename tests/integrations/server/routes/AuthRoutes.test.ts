import request from "supertest";
import ServerApp from "../../../../src/server/ServerApp";
import { SQLiteAppDataSource } from "../../../../src/models/data-source-sqlite";
import { CacheService } from "../../../../src/services/CacheService";
import { Application } from "express";

describe("AuthRoutes tests", () => {
    let cacheService: CacheService;
    let accessToken: string;
    let refreshToken: string;
    let routes: Application;

    beforeAll(async () => {
        await SQLiteAppDataSource.initialize();
        cacheService = new CacheService();
        await cacheService.cacheRedis.connect();
        routes = new ServerApp().app;
    });

    afterAll(async () => {
        try {
            await new Promise(resolve => setTimeout(resolve, 100));
            const client = cacheService.cacheRedis.getClient()
            
            if (client.isOpen && client.isReady) {
                await cacheService.cacheRedis.disconnect();
            };
        } catch (error) {
            console.error({status: "error", message: "Disconnect error", details: error});
        };
    });

    test("Should sign up user and return user data", async () => {
        const response = await request(routes).post("/api/v1/sign-up").send({
            "full_name": "John Doe",
            "date_birth": "01/01/2001",
            "email": "jhondoe100@gmail.com",
            "password": "Jhon_123456",
            "phone": "123456789"
        });
        
        expect(response).toBeDefined();
        expect(response.status).toBe(201);
        expect(response.body.status).toBe("success");
        expect(response.body.message).toBe("Sign up held successfully");
        expect(response.body.data.user).toBeDefined()
    });
    
    test("Should sign in user and return access token and refresh token hash", async () => {
        const response = await request(routes).post("/api/v1/sign-in").send({
            "email": "jhondoe100@gmail.com",
            "password": "Jhon_123456"
        });

        expect(response).toBeDefined();
        expect(response.status).toBe(200);
        expect(response.body.status).toBe("success");
        expect(response.body.message).toBe("Sign in held successfully");
        expect(response.body.data.grant_type).toBeDefined();
        expect(response.headers.authorization).toBeDefined();

        accessToken = response.headers.authorization.replace("Bearer ", "");
        refreshToken = response.body.data.grant_type;
    });
    
    test("Should verify refresh token and return access token and refresh token hash", async () => {
        const response = await request(routes).post("/api/v1/refresh-token").send({
            "grant_type": refreshToken
        });
        
        expect(response).toBeDefined();
        expect(response.status).toBe(200);
        expect(response.body.status).toBe("success");
        expect(response.body.message).toBe("Access token and new refresh token generated successfully");
        expect(response.body.data.grant_type).toBeDefined();
        expect(response.headers.authorization).toBeDefined();
    });
    
    test("Should sign out user and return success message", async () => { // Esse test tá dando esse erro: DisconnectsClientError: Disconnects client
        const response = await request(routes).post("/api/v1/sign-out")
        .set("authorization", `Bearer ${accessToken}`)
        .send({"grant_type": refreshToken});
        
        expect(response).toBeDefined();
        expect(response.status).toBe(200);
        expect(response.body.status).toBe("success");
        expect(response.body.message).toBe("Sign out held successfully");
    });
});