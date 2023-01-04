import { Pet } from "../interfaces/pet.interface";
import PetModel from "../models/pet.model";

const checkPetAlreadyExists = async (_id: string) =>
  await PetModel.findOne({ _id });

const createPet = async (data: Pet) => {
  return await PetModel.create(data);
};
const getPets = async (userId: string) => {
  console.log("Searching: ", userId);

  return await PetModel.find({ userId });
};
const getPet = async (_id: string): Promise<any> => {
  const response = (await PetModel.findById(_id)) || "NOT_FOUND";
  if (response === "NOT_FOUND") return;
  return response;
};
const updatePet = async ({ _id, data }: { _id: string; data: Pet }) => {
  console.log("Updating...", _id, data);
  const petAlreadyExists = await checkPetAlreadyExists(_id);
  console.log("Pete xists: ", petAlreadyExists);
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

export { createPet, getPets, getPet, updatePet, deletePet };
