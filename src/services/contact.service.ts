import { ObjectId } from "mongodb";
import { Contact } from "../interfaces/contact.interface";
import ContactModel from "../models/contact.model";
import UserModel from "../models/user.model";

const createContact = async (_id: ObjectId, data: Contact) => {
  return await UserModel.findOneAndUpdate(
    {
      _id,
    },
    {
      $push: {
        contacts: {
          ...data,
          id: new Date().getTime(),
        },
      },
    }
  );
};

const getContactDetails = async (id: string): Promise<any> => {
  await UserModel.findOne(
    {
      "contacts.id": id,
    },
    (err: unknown, docs: unknown) => {
      if (err) return "NOT_FOUND";
      return docs;
    }
  );
};

const updateContact = async ({
  userId,
  id,
  data,
}: {
  userId: string;
  id: number;
  data: Contact;
}) => {
  const contactAlreadyExists = await UserModel.findOne({
    _id: userId,
    "contacts.id": id,
  });

  if (contactAlreadyExists) {
    const { _id } = contactAlreadyExists;

    return await UserModel.updateOne(
      {
        _id,
        "contacts.id": id,
      },
      {
        $set: {
          "contacts.$.name": data.name,
          "contacts.$.contact_phone": data.contact_phone,
          "contacts.$.contact_phone_2": data.contact_phone_2,
          "contacts.$.city": data.city,
          "contacts.$.email": data.email,
        },
      },
      {
        upsert: true,
        new: true,
      }
    );
  } else {
    return "CONTACT_NOT_FOUND";
  }
};
const deleteContact = async ({
  userId,
  id,
}: {
  userId: string;
  id: number;
}) => {
  return await UserModel.updateOne(
    {
      _id: userId,
    },
    {
      $pull: {
        contacts: { id },
      },
    },
    {
      upsert: true,
      new: true,
    }
  );
};
export { createContact, getContactDetails, updateContact, deleteContact };
