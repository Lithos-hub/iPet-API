import { Pet } from "../interfaces/pet.interface";
import PetModel from "../models/pet.model";

const checkPetAlreadyExists = async (_id: string) =>
  await PetModel.findOne({ _id });

const createPet = async (data: Pet) => {
  return await PetModel.create(data);
};
const getPets = async (userId: string) => {
  return await PetModel.find({ userId });
};
const getPetDetails = async (_id: string): Promise<any> => {
  const response = (await PetModel.findById(_id)) || "NOT_FOUND";

  if (response === "NOT_FOUND") return;
  return response;
};
const updatePet = async ({ _id, data }: { _id: string; data: Pet }) => {
  const petAlreadyExists = await checkPetAlreadyExists(_id);

  if (petAlreadyExists) {
    const { _id } = petAlreadyExists;

    return await PetModel.findByIdAndUpdate(
      {
        _id,
      },
      {
        ...data,
      },
      {
        new: true,
      }
    );
  } else {
    return "PET_NOT_FOUND";
  }
};
const deletePet = async (data: { _id: string }) =>
  await PetModel.findOneAndDelete({ ...data });

export { createPet, getPets, getPetDetails, updatePet, deletePet };
