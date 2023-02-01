import { ObjectId } from "mongodb";
import { User } from "../interfaces/user.interface";
import UserModel from "../models/user.model";
import { encrypt } from "../utils/bcrypt.handle";
import { genToken } from "../utils/jwt.handle";

const checkUserAlreadyExists = async (_id: string) =>
  await UserModel.findOne({ _id });

const getUser = async (_id: ObjectId): Promise<any> => {
  const response = (await UserModel.findById(_id)) || "NOT_FOUND";
  if (response !== "NOT_FOUND") {
    const { _id, createdAt, email, pets, vets, contacts, notes, events } =
      response;
    return {
      _id,
      createdAt,
      email,
      pets,
      vets,
      contacts,
      notes,
      events,
    };
  }
};
const updateUser = async (id: string, data: User) => {
  const userAlreadyExists = await checkUserAlreadyExists(id);

  if (userAlreadyExists) {
    const { _id } = userAlreadyExists;

    let encryptedPassword;
    let dataToSend = {
      ...data,
    };

    if (data.password) {
      encryptedPassword = await encrypt(data.password);
      dataToSend.password = encryptedPassword;
    }

    const update = await UserModel.findByIdAndUpdate(
      {
        _id,
      },
      dataToSend,
      {
        new: true,
      }
    );

    const { email, createdAt } = update as User;

    return {
      token: genToken(_id),
      user: {
        _id: id,
        email,
        createdAt,
      },
    };
  } else {
    return "USER_NOT_FOUND";
  }
};
const deleteUser = async (id: string) => await UserModel.findByIdAndDelete(id);

export { getUser, updateUser, deleteUser };
