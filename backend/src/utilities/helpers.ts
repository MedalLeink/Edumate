import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

interface Token {
  userId: string;
  level: string;
  email: string;
}

export const hashPassword = async (password: string) => {
  const saltRounds = 10;
  const salt = await bcrypt.genSalt(saltRounds);
  const hash = await bcrypt.hash(password, salt);
  return hash;
};

export const generateToken = (data: Token) => {
  return jwt.sign(data, `${process.env.APP_SECRET}`);
};
