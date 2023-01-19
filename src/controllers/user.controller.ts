import { Request, Response } from "express";
import handleHttp from "../utils/error.handle";
import * as UserService from "../services/users.service";
import { ExtendedRequest } from "../interfaces/request.interface";

const getUser = async ({ user }: ExtendedRequest, res: Response) => {
  try {
    const _id = user?._id;
    const response = await UserService.getUser(_id);
    res.send(response);
  } catch (error) {
    handleHttp(res, "ERROR_GET_USER", 500);
  }
};
const updateUser = async ({ params, body }: Request, res: Response) => {
  try {
    const { id } = params;
    const response = await UserService.updateUser(id, body);
    res.send(response);
  } catch (error) {
    handleHttp(res, "ERROR_PUT_USERS", 500);
  }
};
const deleteUser = (_: Request, res: Response) => {
  try {
  } catch (error) {
    handleHttp(res, "ERROR_DELETE_USERS", 500);
  }
};

export { getUser, updateUser, deleteUser };
