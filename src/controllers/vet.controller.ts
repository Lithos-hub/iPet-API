import { Request, Response } from "express";
import handleHttp from "../utils/error.handle";
import * as VetService from "../services/vet.service";
import { ExtendedRequest } from "../interfaces/request.interface";

const createVet = async ({ body, user }: ExtendedRequest, res: Response) => {
  console.log("Creating vet: ", body);
  body.userId = user?._id;

  try {
    const response = await VetService.createVet(body);
    res.send(response);
  } catch (error) {
    handleHttp(res, "ERROR_CREATE_PET", 500);
  }
};

const getVets = async ({ params }: Request, res: Response) => {
  try {
    const { userId } = params; // => User ID
    const response = await VetService.getVets(userId);
    res.send(response);
  } catch (error) {
    handleHttp(res, "ERROR_GET_VETS", 500);
  }
};
const updateVet = async ({ params, body }: ExtendedRequest, res: Response) => {
  try {
    const { _id } = params;
    const response = await VetService.updateVet({ _id, data: body });
    res.send(response);
  } catch (error) {
    handleHttp(res, "ERROR_PUT_VET", 500);
  }
};
const deleteVet = async ({ params }: Request, res: Response) => {
  try {
    const { _id } = params;
    const response = await VetService.deleteVet({
      _id,
    });
    res.send(response);
  } catch (error) {
    handleHttp(res, "ERROR_DELETE_VET", 500);
  }
};

export { createVet, getVets, updateVet, deleteVet };
