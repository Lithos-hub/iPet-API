import { Request, Response } from "express";
import handleHttp from "../utils/error.handle";
import * as PetService from "../services/pet.service";
import { ExtendedRequest } from "../interfaces/request.interface";

const getPet = async ({ params }: Request, res: Response) => {
  try {
    const { _id } = params;
    const response = await PetService.getPetDetails(_id);
    res.send(response);
  } catch (error) {
    handleHttp(res, "ERROR_GET_PET", 500);
  }
};
const createPet = async ({ body, user }: ExtendedRequest, res: Response) => {
  const id = user?._id;
  try {
    const response = await PetService.createPet(id, body);

    res.send(response);
  } catch (error) {
    handleHttp(res, "ERROR_CREATE_PET", 500);
  }
};
const updatePet = async (
  { user, params, body }: ExtendedRequest,
  res: Response
) => {
  try {
    const userId = user?._id;
    const { id } = params;
    const response = await PetService.updatePet({ userId, id, data: body });
    res.send(response);
  } catch (error) {
    handleHttp(res, "ERROR_PUT_PETS", 500);
  }
};
const deletePet = async ({ user, params }: ExtendedRequest, res: Response) => {
  try {
    const userId = user?._id;
    const { id } = params;
    const response = await PetService.deletePet({ userId, id });
    res.send(response);
  } catch (error) {
    handleHttp(res, "ERROR_DELETE_VETS", 500);
  }
};

export { createPet, getPet, updatePet, deletePet };
