import { ObjectId } from "mongodb";
import { Pet } from "../interfaces/pet.interface";

import UserModel from "../models/user.model";

const createPet = async (_id: ObjectId, data: Pet) => {
  return await UserModel.findOneAndUpdate(
    {
      _id,
    },
    {
      $push: {
        pets: {
          ...data,
          id: new Date().getTime(),
        },
      },
    }
  );
};

const getPetDetails = async (id: string): Promise<any> => {
  await UserModel.findOne(
    {
      "pets.id": id,
    },
    (err: unknown, docs: unknown) => {
      if (err) return "NOT_FOUND";
      return docs;
    }
  );
};

const updatePet = async ({
  userId,
  id,
  data,
}: {
  userId: string;
  id: string;
  data: Pet[];
}) => {
  const petAlreadyExists = await UserModel.findOne({
    _id: userId,
    "pets.id": id,
  });

  if (petAlreadyExists) {
    const { _id } = petAlreadyExists;

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
    return "PET_NOT_FOUND";
  }
};
const deletePet = async ({ userId, id }: { userId: string; id: string }) => {
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

export { createPet, getPetDetails, updatePet, deletePet };
