import { UserService } from "../services/UserService";
import {
  BadRequestError,
  InternalServerError,
  NotFoundError,
  UnauthorizedError,
} from "../helpers/APIErrors";
import { CryptService } from "./CryptService";
import TokenJWTService from "../services/TokenJWTService";
import { CacheService } from "./CacheService";

export class AuthService {
  private readonly userService = new UserService();
  private readonly cacheService = new CacheService();

  async signIn(
    email: string,
    password: string
  ): Promise<{ accessToken: string; refreshTokenHash: string }> {
    const user = await this.userService.getUserByEmail(email);

    if (!user) {
      throw new NotFoundError("Invalid email or password", {userError: user});
    };

    const passwordValidate = await CryptService.verifyEncrypt(password, user.password)
      .then((validate) => {
        return validate;
      })
      .catch((err) => {
        throw new InternalServerError(err.message, {error: err});
      });

    if (passwordValidate === false) {
      throw new UnauthorizedError("Invalid email or password");
    };

    const accessToken = await TokenJWTService.generateAccessToken(user.id);
    const refreshToken = await TokenJWTService.generateRefreshToken(user.id);

    if (!accessToken) {
      throw new InternalServerError("Generate access token error", {accessTokenError: accessToken});
    };

    if (!refreshToken) {
      throw new InternalServerError("Generate refresh token error", {refreshTokenError: refreshToken});
    };

    const refreshTokenHash = await CryptService.encrypt(refreshToken);

    if (!refreshTokenHash) {
      throw new InternalServerError("Refresh token encryption error", {refreshTokenHashError: refreshTokenHash});
    };

    const redisValues = {
      userId: user.id.toString(),
      refreshTokenHash,
      expirationTime: (60 * 60 * 24 * 7).toString(),
    };

    const cacheSet = await this.cacheService.hSetCache(
      refreshTokenHash,
      redisValues,
      parseInt(redisValues.expirationTime)
    );

    if (!cacheSet) {
      throw new InternalServerError("Cache set error", {cacheSetError: cacheSet});
    }

    return { accessToken, refreshTokenHash };
  };
  
  async signOut(accessToken: string, refreshTokenHash: string): Promise<Boolean> {
    const decodeAccessToken = await TokenJWTService.verifyToken(accessToken);

    const accessTokenHash = await CryptService.encrypt(accessToken);
    
    const InvalidedAccessToken = await this.cacheService.hSetCache(accessTokenHash, {accessTokenHash}, decodeAccessToken.iat);

    if (Object.keys(InvalidedAccessToken).length < 0) {
      throw new InternalServerError("Error to invalidate access token", {InvalidAccessTokenError: InvalidedAccessToken});
    };

    const deletedRefresh = this.cacheService.deleteByKeyCache(refreshTokenHash);

    if (!deletedRefresh) {
      throw new InternalServerError("Error to delete refresh token", {deletedRefreshError: deletedRefresh});
    };

    return true;
  };

  async accessToken(accessToken: string): Promise<Boolean> {
    const validateAccessToken = await TokenJWTService.verifyToken(accessToken);

    if (!validateAccessToken) {
      throw new UnauthorizedError("Invalid access token");
    };

    return true;
  };

  async refreshToken(
    refreshToken: string
  ): Promise<{ accessToken: string; refreshTokenHash: string }> {
    if (!refreshToken) {
      throw new BadRequestError("Refresh token is required");
    };

    const getRefresh = await this.cacheService.hGetAllCache(refreshToken);

    if (!getRefresh) {
      throw new UnauthorizedError("Invalid refresh token or expired", {
        getRefresh,
      });
    };

    const deletedRefresh = await this.cacheService.deleteByKeyCache(
      getRefresh.refreshTokenHash
    );

    if (deletedRefresh === 0) {
      throw new BadRequestError("Error deleting refresh token from cache", {
        deletedRefresh,
      });
    };

    const accessToken = await TokenJWTService.generateAccessToken(parseInt(getRefresh.userId));

    const newRefreshToken = await TokenJWTService.generateRefreshToken(parseInt(getRefresh.userId));

    if (!accessToken) {
      throw new InternalServerError("Generate access token error");
    };

    if (!newRefreshToken) {
      throw new InternalServerError("Generate refresh token error");
    };

    const refreshTokenHash = await CryptService.encrypt(newRefreshToken);

    if (!refreshTokenHash) {
      throw new InternalServerError("Refresh token encryption error");
    };

    return { accessToken, refreshTokenHash };
  };
};