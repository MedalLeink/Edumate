import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

export const authoriser = async (
  request: JwtPayload,
  response: Response,
  next: NextFunction
) => {
  try {
    const authorization = request.headers.authorization;

    if (authorization === undefined) {
      return response.status(401).json({
        message: `You are not authorized to view this page`,
      });
    }
    const token = authorization.split(" ");
    const mainToken = token[1];
    if (!mainToken || mainToken === "") {
      return response.status(401).json({
        status: `Failed`,
        message: `Login required`,
      });
    }
    const decode = jwt.verify(mainToken, `${process.env.APP_SECRET}`);
    if (decode) {
      request.user = decode;
      next();
    }
    return response.status(400).json({
      message: `Invalid token`,
    });
  } catch (err: any) {
    console.log(err.message);
  }
};
