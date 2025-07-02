import APIErrorsHandler, { ConflictError, InternalServerError, NotFoundError, UnauthorizedError } from "../../../src/helpers/APIErrors";

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

    test("Should create an Unauthorized Error", () => {
        const error = new UnauthorizedError("User not authorized", {error: "Invalid token"});

        expect(error.message).toBe("User not authorized");
        expect(error.statusCode).toBe(401);
        expect(error).toBeInstanceOf(Error);
        expect(error).toBeInstanceOf(APIErrorsHandler);
        expect(error).toBeInstanceOf(UnauthorizedError);
        expect(error.details).toBeDefined();
    });

    test("Should create an Internal Server Error", () => {
        const error = new InternalServerError("Generate token error");

        expect(error.message).toBe("User not authorized");
        expect(error.statusCode).toBe(500);
        expect(error).toBeInstanceOf(Error);
        expect(error).toBeInstanceOf(APIErrorsHandler);
        expect(error).toBeInstanceOf(UnauthorizedError);
        expect(error.details).toBeUndefined();
    });
});