import { Request, Response } from "express";
import handleHttp from "../utils/error.handle";
import * as PetService from "../services/pet.service";
import { ExtendedRequest } from "../interfaces/request.interface";

const createPet = async ({ body, user }: ExtendedRequest, res: Response) => {
  console.log("Creating pet: ", body, user);

  body.userId = user?._id;
  console.log("Body pet: ", body);
  try {
    const response = await PetService.createPet(body);
    res.send(response);
  } catch (error) {
    handleHttp(res, "ERROR_CREATE_PET", 500);
  }
};
const getPet = async ({ params }: Request, res: Response) => {
  try {
    const { _id } = params;
    const response = await PetService.getPet(_id);
    res.send(response);
  } catch (error) {
    handleHttp(res, "ERROR_GET_PET", 500);
  }
};
const getPets = async ({ params }: Request, res: Response) => {
  try {
    const { userId } = params; // => User ID
    const response = await PetService.getPets(userId);
    res.send(response);
  } catch (error) {
    handleHttp(res, "ERROR_GET_PETS", 500);
  }
};
const updatePet = async ({ params, body }: ExtendedRequest, res: Response) => {
  try {
    const { _id } = params;
    const response = await PetService.updatePet({ _id, data: body });
    res.send(response);
  } catch (error) {
    handleHttp(res, "ERROR_PUT_PETS", 500);
  }
};
const deletePet = async ({ params }: Request, res: Response) => {
  try {
    const { _id } = params;
    const response = await PetService.deletePet({
      _id,
    });
    res.send(response);
  } catch (error) {
    handleHttp(res, "ERROR_DELETE_PETS", 500);
  }
};

export { createPet, getPet, getPets, updatePet, deletePet };
