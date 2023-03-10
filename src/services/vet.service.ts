import { ObjectId } from "mongodb";
import { Vet } from "../interfaces/vet.interface";
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
  id: number;
  data: Vet;
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
        "vets.id": id,
      },
      {
        $set: {
          "vets.$.name": data.name,
          "vets.$.contact_phone": data.contact_phone,
          "vets.$.emergency_phone": data.emergency_phone,
          "vets.$.city": data.city,
        },
      },
      {
        upsert: true,
        new: true,
      }
    );
  } else {
    return "VET_NOT_FOUND";
  }
};
const deleteVet = async ({ userId, id }: { userId: string; id: number }) => {
  return await UserModel.updateOne(
    {
      _id: userId,
    },
    {
      $pull: {
        vets: { id },
      },
    },
    {
      upsert: true,
      new: true,
    }
  );
};
export { createVet, getVetDetails, updateVet, deleteVet };
