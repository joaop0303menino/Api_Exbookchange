import APIErrorsHandler from "../../../src/helpers/APIErrors";
import { SQLiteAppDataSource } from "../../../src/models/data-source-sqlite";
import { User } from "../../../src/models/entities/User";
import { AuthService } from "../../../src/services/AuthService";
import { CacheService } from "../../../src/services/CacheService";
import { CryptService } from "../../../src/services/CryptService";
import { UserService } from "../../../src/services/UserService";

describe("AuthService tests", () => {
  let userService: UserService;
  let authService: AuthService;
  let cacheService: CacheService;
  let accessTokenToTests: string;
  let refreshTokenToTests: string;

  beforeAll(async () => {
    await SQLiteAppDataSource.initialize();
    userService = new UserService();
    authService = new AuthService();
    cacheService = new CacheService();
  });

  test("Should login user and return access token and refresh token hash", async () => {
    const user = new User();

    const password = "123456";

    const passwordHash = await CryptService.encrypt(password);

    user.full_name = "Jhon Doe";
    user.date_birth = new Date("1990/01/01");
    user.email = "test9@test.com";
    user.password = passwordHash;
    user.phone = "1234567890";

    const newUser = await userService.createUser(user);

    if (!newUser) {
      throw new APIErrorsHandler("User creation failed", 500, newUser);
    }

    const { accessToken, refreshTokenHash } = await authService.signIn(
      user.email,
      password
    );

    expect(accessToken).toBeDefined();
    expect(refreshTokenHash).toBeDefined();

    accessTokenToTests = accessToken;
    refreshTokenToTests = refreshTokenHash;
  });

  test("Should validate user with access token", async () => {
    const validate = await authService.accessToken(accessTokenToTests);

    expect(validate).toBeTruthy();
  });

  test("Should login user with refresh token, should return new access and refresh token hashes", async () => {
    const { accessToken, refreshTokenHash } = await authService.refreshToken(
      refreshTokenToTests
    );

    expect(accessToken).toBeDefined();
    expect(refreshTokenHash).toBeDefined();
  });
});
