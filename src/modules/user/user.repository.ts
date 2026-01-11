import { users } from "./user.schema";
import { eq } from "drizzle-orm";
import { IUser } from "./user.type";
import { db } from "../../database/drizzle";

export class UserRepository {
  async createUser(uuid: string, name: string, username: string, password: string) {
    const result = await db
      .insert(users)
      .values({
        uuid,
        name,
        username,
        password,
      })
    return {
      name,
      username,
    };
  }
  async getAllUsers(): Promise<IUser[]> {
    const result = await db.select().from(users);
    return result;
  }

  async findUserByUsername(username: string): Promise<IUser | undefined> {
    const result = await db
      .select()
      .from(users)
      .where(eq(users.username, username));
    return result[0];
  }
  async findUserById(userId: string): Promise<IUser | undefined> {
    const result = await db.select().from(users).where(eq(users.uuid, userId));
    return result[0];
  }

  async findUserByUuid(uuid: string): Promise<IUser | undefined> {
    const result = await db.select().from(users).where(eq(users.uuid, uuid));
    return result[0];
  }

  async updateUser(
    userId: string,
    name: string,
    username: string,
    role: "admin" | "user"
  ) {
    const result = await db
      .update(users)
      .set({
        name,
        username,
        role,
      })
      .where(eq(users.uuid, userId));
    return result;
  }

  async deleteUser(userId: string) {
    const result = await db.delete(users).where(eq(users.uuid, userId));
    return result;
  }
}
