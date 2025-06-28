import { APIBody } from "../../../src/dtos/APIBody";

describe("APIBody tests", () => {
    test("Should create a new APIBody instance", () => {
        const body = new APIBody("sucess", "Hello Jhon Doe", {id: 1, name: "Jhon Doe"});

        expect(body).toBeInstanceOf(APIBody);
        expect(body.status).toBe("sucess");
        expect(body.message).toBe("Hello Jhon Doe");
        expect(body.data).toEqual({id: 1, name: "Jhon Doe"});
    });
});