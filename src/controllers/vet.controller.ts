import { Response } from "express";
import handleHttp from "../utils/error.handle";
import * as VetService from "../services/vet.service";
import { ExtendedRequest } from "../interfaces/request.interface";

const createVet = async ({ body, user }: ExtendedRequest, res: Response) => {
  const id = user?._id;
  try {
    const response = await VetService.createVet(id, body);

    res.send(response);
  } catch (error) {
    handleHttp(res, "ERROR_CREATE_VET", 500);
  }
};
const updateVet = async (
  { user, params, body }: ExtendedRequest,
  res: Response
) => {
  try {
    const userId = user?._id;
    const { id } = params;
    const vetId = Number(id);
    const response = await VetService.updateVet({
      userId,
      id: vetId,
      data: body,
    });
    res.send(response);
  } catch (error) {
    handleHttp(res, "ERROR_PUT_VET", 500);
  }
};
const deleteVet = async ({ user, params }: ExtendedRequest, res: Response) => {
  try {
    const userId = user?._id;
    const { id } = params;
    const vetId = Number(id);
    const response = await VetService.deleteVet({ userId, id: vetId });
    res.send(response);
  } catch (error) {
    handleHttp(res, "ERROR_DELETE_VET", 500);
  }
};

export { createVet, updateVet, deleteVet };
