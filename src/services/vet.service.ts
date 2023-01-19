import { ObjectId } from "mongodb";
import { Vet } from "../interfaces/vet.interface";
import VetModel from "../models/vet.model";
import UserModel from "../models/user.model";

const createVet = async (_id: ObjectId, data: Vet) => {
  return await UserModel.findOneAndUpdate(
    {
      _id,
    },
    {
      $push: {
        vets: {
          ...data,
          id: new Date().getTime(),
        },
      },
    }
  );
};

const getVetDetails = async (id: string): Promise<any> => {
  await UserModel.findOne(
    {
      "vets.id": id,
    },
    (err: unknown, docs: unknown) => {
      if (err) return "NOT_FOUND";
      return docs;
    }
  );
};

const updateVet = async ({
  userId,
  id,
  data,
}: {
  userId: string;
  id: string;
  data: Vet[];
}) => {
  const vetAlreadyExists = await UserModel.findOne({
    _id: userId,
    "vets.id": id,
  });

  if (vetAlreadyExists) {
    const { _id } = vetAlreadyExists;

    return await UserModel.updateOne(
      {
        _id,
      },
      {
        $set: [...data],
      },
      {
        upsert: true,
      }
    );
  } else {
    return "VET_NOT_FOUND";
  }
};
const deleteVet = async ({ userId, id }: { userId: string; id: string }) => {
  return await UserModel.findOneAndUpdate(
    {
      _id: userId,
    },
    {
      $pull: {
        vets: { id },
      },
    }
  );
};
export { createVet, getVetDetails, updateVet, deleteVet };
