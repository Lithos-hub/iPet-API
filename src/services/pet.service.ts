import { ObjectId } from "mongodb";
import { Pet } from "../interfaces/pet.interface";

import UserModel from "../models/user.model";

const createPet = async (_id: ObjectId, data: Pet) => {
  const createdPet = await UserModel.findOneAndUpdate(
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
    },
    {
      new: true,
    }
  );

  return createdPet?.pets.at(-1);
};

const getPetDetails = async ({
  userId,
  id,
}: {
  userId: string;
  id: number;
}): Promise<any> => {
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
  id: number;
  data: Pet;
}) => {
  const petAlreadyExists = await UserModel.findOne({
    _id: userId,
    "pets.id": id,
  });

  if (petAlreadyExists) {
    const { _id } = petAlreadyExists;

    return await UserModel.findOneAndUpdate(
      {
        _id,
      },
      {
        $set: {
          pets: data,
        },
      },
      {
        upsert: true,
        new: true,
      }
    );
  } else {
    return "PET_NOT_FOUND";
  }
};
const deletePet = async ({ userId, id }: { userId: string; id: number }) => {
  return await UserModel.updateOne(
    {
      _id: userId,
    },
    {
      $pull: {
        pets: { id },
      },
    },
    {
      upsert: true,
      new: true,
    }
  );
};

export { createPet, getPetDetails, updatePet, deletePet };
