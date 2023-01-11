import { Vet } from "../interfaces/vet.interface";
import VetModel from "../models/vet.model";

const checkVetAlreadyExists = async (_id: string) =>
  await VetModel.findOne({ _id });

const createVet = async (data: Vet) => await VetModel.create(data);

const getVets = async (userId: string) => await VetModel.find({ userId });

const getVetDetails = async (_id: string): Promise<any> => {
  const response = (await VetModel.findById(_id)) || "NOT_FOUND";

  if (response === "NOT_FOUND") return;
  return response;
};
const updateVet = async ({ _id, data }: { _id: string; data: Vet }) => {
  const vetAlreadyExists = await checkVetAlreadyExists(_id);

  if (vetAlreadyExists) {
    const { _id } = vetAlreadyExists;

    return await VetModel.findByIdAndUpdate(
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
const deleteVet = async (data: { _id: string }) =>
  await VetModel.findOneAndDelete({ ...data });

export { createVet, getVets, getVetDetails, updateVet, deleteVet };
