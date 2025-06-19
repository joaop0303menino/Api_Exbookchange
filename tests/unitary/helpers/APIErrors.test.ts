import APIErrorsHandler, { ConflictError, NotFoundError } from "../../../src/helpers/APIErrors";

describe("API errors tests", () => {
    test("Should create an API errors", () => {
        const error = new APIErrorsHandler("Internal Server Error", 500);
        
        expect(error.message).toBeDefined();
        expect(error.statusCode).toBe(500);
        expect(error).toBeInstanceOf(Error);
    });

    test("Should create an Conflict Error", () => {
        const error = new ConflictError("User already exists");

        expect(error.message).toBeDefined();
        expect(error.statusCode).toBe(409);
        expect(error).toBeInstanceOf(Error);
    });

    test("Should create an Not Found Error", () => {
        const error = new NotFoundError("User not found", []);

        expect(error.message).toBeDefined();
        expect(error.statusCode).toBe(404);
        expect(error).toBeInstanceOf(Error);
        expect(error.details).toHaveLength(0);
    });
});