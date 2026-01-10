import jwt from "jsonwebtoken";
import env from "../../env";

const generateAccessToken = (payload: any): string => {
  return jwt.sign(payload, env.SECRET_ACCESS_TOKEN!, {
    expiresIn: "1d",
  });
};

const generateRefreshToken = (payload: any): string => {
  return jwt.sign(payload, env.SECRET_REFRESH_TOKEN!, {
    expiresIn: "7d",
  });
};

const verifyAccessToken = (token: string): any => {
  return jwt.verify(token, env.SECRET_ACCESS_TOKEN!);
};

const verifyRefreshToken = (token: string): any => {
  return jwt.verify(token, env.SECRET_REFRESH_TOKEN!);
}

export { generateAccessToken, generateRefreshToken, verifyAccessToken, verifyRefreshToken };