import APIErrorsHandler, { BadRequestError, NotFoundError } from "../../../src/helpers/APIErrors";
import { SQLiteAppDataSource } from "../../../src/models/data-source-sqlite";
import { User } from "../../../src/models/entities/User";
import UserService from "../../../src/services/UserService";

describe("UserService tests", () => {
    let userService: UserService;

    beforeAll(async () => {
        await SQLiteAppDataSource.initialize();
        userService = new UserService();
    });

    test("Should create user", async () => {
        const user = new User();
        user.full_name = "Jhon Doe";
        user.date_birth = new Date("2000/01/24");
        user.email = "jhondoe24@gmail.com";
        user.password = "JhonDoe_123";

        const createdUser = await userService.createUser(user);

        expect(createdUser).toBeInstanceOf(User);
        expect(createdUser.id).toBeDefined();
        expect(createdUser.full_name).toBe(user.full_name);
        expect(createdUser.date_birth).toBe(user.date_birth);
        expect(createdUser.email).toBe(user.email);
        expect(createdUser.password).toBe(user.password);
        expect(createdUser.created_at).toBeInstanceOf(Date);
        expect(createdUser.updated_at).toBeInstanceOf(Date);
    });

    test("Should get all users", async () => {
        const users = await userService.getAllUsers();

        expect(Array.isArray(users)).toBe(true);
        expect(users).toBeDefined();
        expect(users).not.toHaveLength(0);
    });

    test("Should get user by id", async () => {
        const user = await userService.getUserById(1);
    });

    test("Should get user by email", async () => {
        const user = await userService.getUserByEmail("jhonDOE@gmail.com");
    });

    test("Should update user", async () => {
        const user = await userService.getUserById(1);
        const userData = {phone: "40028922"};

        if (!user) {
            throw new NotFoundError("User not found");
        };

        const updatedUser = await userService.updateUser(userData, user);

        if (!updatedUser) {
            throw new BadRequestError("Update any atributtes");
        };

        expect(updatedUser).toBeInstanceOf(User);
        expect(updatedUser.phone).toBe(userData.phone);
    });

    test("Should delete user", async () => {
        const deletedUser = await userService.deleteUser(4);

        if (deletedUser.affected === 0) {
            throw new BadRequestError("User not deleted");
        };

        expect(deletedUser.affected).toBe(1);
    });
});