// modules/auth/auth.service.js
import bcrypt from "bcrypt";
import UserRepo from "#user/user.repository";
import ExptectedError from "#shared/errors/errorHandler";

export const register = async (payload) => {
  const exist = await UserRepo.getByUsername(payload.username);
  if (exist) throw new ExptectedError("user already exist", 409);

  const user = await UserRepo.create({
    name: payload.name,
    username: payload.username,
    password: await bcrypt.hash(payload.password, 10),
    role: "user",
  });

  if (!user) throw new ExptectedError("failed to create", 500);

  return user;
};

export const login = async (username, password) => {
  const user = await UserRepo.getByUsername(username);
  if (!user) throw new ExptectedError("failed to create", 500);

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new ExptectedError("invalid credential", 403);

  return user;
};
