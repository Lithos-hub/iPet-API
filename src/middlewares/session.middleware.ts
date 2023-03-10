import { NextFunction, Request, Response } from "express";
import { ExtendedRequest } from "../interfaces/request.interface";
import handleHttp from "../utils/error.handle";
import { verifyToken } from "../utils/jwt.handle";

const checkJwt = (req: ExtendedRequest, res: Response, next: NextFunction) => {
  try {
    const token = req.headers["x-token"] || "";

    if (!token) {
      handleHttp(res, "NOT_TOKEN", 401);
      return;
    }
    const dataToken = verifyToken(String(token)) as { _id: string };
    if (!dataToken._id) {
      handleHttp(res, "ERROR_ID_TOKEN", 401);
      return;
    }

    req.user = dataToken;
    next();
  } catch (error) {
    handleHttp(res, "INVALID_SESSION_JWT", 401);
  }
};

export { checkJwt };
