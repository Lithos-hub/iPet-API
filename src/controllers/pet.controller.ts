import { Request, Response } from "express";
import handleHttp from "../utils/error.handle";
import * as PetService from "../services/pet.service";
import { ExtendedRequest } from "../interfaces/request.interface";

const getPet = async ({ user, params }: ExtendedRequest, res: Response) => {
  try {
    const userId = user?._id;
    const { id } = params;
    const petId = Number(id);
    const response = await PetService.getPetDetails({ userId, id: petId });
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
    const petId = Number(id);
    const response = await PetService.updatePet({
      userId,
      id: petId,
      data: body,
    });
    res.send(response);
  } catch (error) {
    handleHttp(res, "ERROR_PUT_PET", 500);
  }
};
const deletePet = async ({ user, params }: ExtendedRequest, res: Response) => {
  try {
    const userId = user?._id;
    const { id } = params;
    const petId = Number(id);

    const response = await PetService.deletePet({ userId, id: petId });
    res.send(response);
  } catch (error) {
    handleHttp(res, "ERROR_DELETE_PET", 500);
  }
};

export { createPet, getPet, updatePet, deletePet };
