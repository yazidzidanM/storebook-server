// modules/auth/auth.service.js
import { UserRepository } from "#user/user.repository";
import { AuthRepository } from "#modules/auth/auth.repository";
import ExptectedError from "#shared/errors/errorHandler";
import { hashsingPassword, verifyPassword } from "#shared/helpers/hanshing";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
} from "#shared/helpers/jsonwebtoken";
import * as userValidation from "#modules/user/user.validation";
import { v4 as uuidv4 } from "uuid";

class AuthServices {
  constructor(
    private userRepo: UserRepository,
    private authRepo: AuthRepository
  ) {
    this.userRepo = new UserRepository();
  }
  
  async registerUser(name: string, username: string, password: string) {

    const uuid = uuidv4();

    const validated = userValidation.registerSchema.validate({
      name,
      username,
      password,
    });
    if (!validated) throw new ExptectedError("validation failed", 400);
    
    const existingUser = await this.userRepo.findUserByUsername(username);
    if (existingUser) throw new ExptectedError("Username already exists", 400);
    
    const hashedPassword = await hashsingPassword(password);
    
    const newUser = await this.userRepo.createUser(
      uuid,
      name,
      username,
      hashedPassword
    );
    if (!newUser) throw new ExptectedError("failed to create user", 400);

    const access_tokens = generateAccessToken({
      uuid,
      name,
      username,
      type: "access",
      role: "user",
    });

    const refresh_tokens = generateRefreshToken({
      uuid,
      name,
      username,
      type: "refresh",
      role: "user",
    });

    await this.authRepo.createCredentials(uuid, refresh_tokens);

    return {
      user: { uuid, name, username },
      accessToken: access_tokens,
      refreshToken: refresh_tokens,
    };
  }

  async login(username: string, password: string) {

    const validated = userValidation.loginSchema.validate({
      username,
      password,
    });
    if (!validated) throw new ExptectedError("validation failed", 400);

    const existingUser = await this.userRepo.findUserByUsername(username);
    if (!existingUser) throw new ExptectedError("Invalid username or password", 401);

    const isPasswordValid = verifyPassword(password, existingUser.password);
    if (!isPasswordValid) throw new ExptectedError("Invalid username or password", 401);

    const access_tokens = generateAccessToken({
      uuid: existingUser.uuid,
      name: existingUser.name,
      username,
      type: "access",
      role: existingUser.role,
    });
    
    const refresh_tokens = generateRefreshToken({
      uuid: existingUser.uuid,
      name: existingUser.name,
      username,
      type: "refresh",
      role: existingUser.role,
    });

    await this.authRepo.deleteTokensByUserId(existingUser.uuid);

    await this.authRepo.createCredentials(existingUser.uuid, refresh_tokens);

    return {
      user: { uuid: existingUser.uuid, name: existingUser.name, username },
      accessToken: access_tokens,
      refreshToken: refresh_tokens,
    };
  }

  async logout(token: string) {
    if(!token) throw new ExptectedError("Unauthorized", 403);

    const decoded = verifyRefreshToken(token);
    if (!decoded) throw new ExptectedError("Invalid token", 401);

    const existingToken = await this.authRepo.findTokensByUserUuid(decoded.uuid);
    if (!existingToken) throw new ExptectedError("User not found", 404);

    console.log(existingToken)

    await this.authRepo.revokeTokenByUserUuid(decoded.uuid);
    
    return;
  }
  
  async refreshSession(token: any) {
    if(!token) throw new ExptectedError("Unauthorized", 403);

    const decoded = verifyRefreshToken(token);
    if (!decoded) throw new ExptectedError("Invalid token", 401);

    const existingUser = await this.userRepo.findUserByUuid(decoded.uuid);
    if (!existingUser) throw new ExptectedError("User not found", 404);

    const access_tokens = generateAccessToken({
      uuid: existingUser.uuid,
      name: existingUser.name,
      username: existingUser.username,
      type: "access",
    });

    return {
      access_token: access_tokens,
    };
  }
}

export default AuthServices;
