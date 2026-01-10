import { users } from "#modules/user/user.schema";
import { eq } from "drizzle-orm";
import { db } from "src/database/drizzle";
import { refreshTokens } from "./auth.schema";

export class AuthRepository {
  async createCredentials(uuid: string, token: string) {
    const result = await db.insert(refreshTokens).values({
      userId: uuid,
      token,
      isRevoked: 0,
    });
    return result;
  }

  async findTokensByUserUuid(userId: string) {
    const result = await db
      .select()
      .from(refreshTokens)
      .where(eq(refreshTokens.userId, userId));
    return result;
  }

  async revokeTokenByUserUuid(userId: string) {
    const result = await db
      .update(refreshTokens)
      .set({ isRevoked: 1 })
      .where(eq(refreshTokens.userId, userId));
    return result;
  }

  async deleteTokensByUserId(userId: string) {
    const result = await db
      .delete(refreshTokens)
      .where(eq(refreshTokens.userId, userId));
    return result;
  }
}
