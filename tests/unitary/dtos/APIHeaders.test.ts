import { APIHeaders } from "../../../src/dtos/APIHeaders";

describe("API Response Headers tests", () => {
    test("Should return content Type", () => {
        const headers = APIHeaders.json();

        expect(headers["Content-Type"]).toBe("application/json");
    });

    test("Should return headers necessary for authorization", () => {
        const token = "MyToken";
        
        const headers = APIHeaders.withAuth(token);
        
        expect(headers["Content-Type"]).toBe("application/json");
        expect(headers["Authorization"].replace("Bearer ", "")).toBe(token);
    });
    
    test("Should return all headers", () => {
        const token = "MyToken";
        
        const headers = APIHeaders.fullHeaders(token);

        expect(headers["Content-Type"]).toBe("application/json");
        expect(headers["Access-Control-Allow-Origin"]).toBe("*");
        expect(headers["Access-Control-Allow-Headers"].trim().split(",")).not.toHaveLength(0);
        expect(headers["Access-Control-Allow-Methods"].trim().split(",")).not.toHaveLength(0);
    });
});