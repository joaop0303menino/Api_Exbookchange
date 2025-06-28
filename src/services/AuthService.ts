import UserService from "../services/UserService";
import APIErrorsHandler, {
  BadRequestError,
  NotFoundError,
  UnauthorizedError,
} from "../helpers/APIErrors";
import CryptService from "./CryptService";
import TokenJWTService from "../services/TokenJWTService";
import { CacheService } from "./CacheService";

export class AuthService {
  private readonly userService = new UserService();
  private readonly cacheService = new CacheService();

  async login(
    email: string,
    password: string
  ): Promise<{ accessToken: string; refreshTokenHash: string }> {
    const user = await this.userService.getUserByEmail(email);

    if (!user) {
      throw new NotFoundError("Invalid email or password");
    }

    const passwordValidate = await CryptService.verifyEncrypt(password, user.password)
      .then((validate) => {
        return validate;
      })
      .catch((err) => {
        throw new APIErrorsHandler(err.message, 500, err);
      });

    if (passwordValidate === false) {
      throw new UnauthorizedError("Invalid email or password");
    }

    if (user.phone === null || user.phone === undefined || user.phone === "") {
      var userPhone = false;
    } else {
      var userPhone = true;
    }

    const accessToken = await TokenJWTService.generateAccessToken(
      user.id,
      userPhone
    );
    const refreshToken = await TokenJWTService.generateRefreshToken(user.id);

    if (!accessToken) {
      throw new APIErrorsHandler("Generate access token error", 500);
    }

    if (!refreshToken) {
      throw new APIErrorsHandler("Generate refresh token error", 500);
    }

    const refreshTokenHash = await CryptService.encrypt(refreshToken);

    if (!refreshTokenHash) {
      throw new APIErrorsHandler("Refresh token encryption error", 500);
    }

    const redisValues = {
      userId: user.id.toString(),
      refreshTokenHash,
      phoneExists: userPhone.toString(),
      expirationTime: (60 * 60 * 24 * 7).toString(),
    };

    const cacheSet = await this.cacheService.hSetCache(
      refreshTokenHash,
      redisValues,
      parseInt(redisValues.expirationTime)
    );

    if (!cacheSet) {
      throw new APIErrorsHandler("Cache set error", 500);
    }

    return { accessToken, refreshTokenHash };
  }

  async accessToken(accessToken: string): Promise<Boolean> {
    if (!accessToken) {
      throw new BadRequestError("Access token is required");
    }

    const validateAccessToken = await TokenJWTService.verifyToken(accessToken);

    if (!validateAccessToken) {
      throw new UnauthorizedError("Invalid access token");
    }

    return true;
  }

  async refreshToken(
    refreshToken: string
  ): Promise<{ accessToken: string; refreshTokenHash: string }> {
    if (!refreshToken) {
      throw new BadRequestError("Refresh token is required");
    }

    const getRefresh = await this.cacheService.hGetAllCache(refreshToken);

    if (!getRefresh) {
      throw new UnauthorizedError("Invalid refresh token or expired", {
        getRefresh,
      });
    }

    const deletedRefresh = await this.cacheService.deleteByKeyCache(
      getRefresh.refreshTokenHash
    );

    if (deletedRefresh === 0) {
      throw new BadRequestError("Error deleting refresh token from cache", {
        deletedRefresh,
      });
    }

    const accessToken = await TokenJWTService.generateAccessToken(
      parseInt(getRefresh.userId),
      Boolean(getRefresh.phoneExists)
    );
    const newRefreshToken = await TokenJWTService.generateRefreshToken(
      parseInt(getRefresh.userId)
    );

    if (!accessToken) {
      throw new APIErrorsHandler("Generate access token error", 500);
    }

    if (!newRefreshToken) {
      throw new APIErrorsHandler("Generate refresh token error", 500);
    }

    const refreshTokenHash = await CryptService.encrypt(newRefreshToken);

    if (!refreshTokenHash) {
      throw new APIErrorsHandler("Refresh token encryption error", 500);
    }

    return { accessToken, refreshTokenHash };
  }
}
