import { Request, Response } from "express";
import fs from "fs";
import { registerUser, loginUser } from "../services/auth.service";
import { getUser } from "../services/users.service";
import handleHttp from "../utils/error.handle";
import { genToken } from "../utils/jwt.handle";

const signUp = async ({ body }: Request, res: Response) => {
  const response = await registerUser(body);

  if (response === "USER_ALREADY_EXISTS") {
    handleHttp(res, "User already exists", 401);
  } else {
    const { _id } = response.user;
    const dir = `${process.cwd()}/public/${_id}`;
    if (!fs.existsSync(dir)) fs.mkdirSync(dir);
    res.send(response);
  }
};

const signIn = async ({ body }: Request, res: Response) => {
  const response = await loginUser(body);
  if (response === "INCORRECT_PASSWORD OR USER_NOT_FOUND") {
    handleHttp(res, "Incorrect email or password", 401);
  } else {
    res.send(response);
  }
};

const getSession = async ({ body }: Request, res: Response) => {
  const { _id } = body;
  const response = await getUser(_id);
  if (response === "NOT_FOUND") {
    handleHttp(res, "Invalid session", 401);
  } else {
    res.send({
      user: response,
      token: genToken(_id),
    });
  }
};

export { signUp, signIn, getSession };
