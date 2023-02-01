import { ObjectId } from "mongodb";
import { Note } from "../interfaces/note.interface";
import UserModel from "../models/user.model";

const createNote = async (_id: ObjectId, data: Note) => {
  return await UserModel.findOneAndUpdate(
    {
      _id,
    },
    {
      $push: {
        notes: {
          ...data,
          id: new Date().getTime(),
        },
      },
    }
  );
};

const getNoteDetails = async (id: string): Promise<any> => {
  await UserModel.findOne(
    {
      "notes.id": id,
    },
    (err: unknown, docs: unknown) => {
      if (err) return "NOT_FOUND";
      return docs;
    }
  );
};

const updateNote = async ({
  userId,
  id,
  data,
}: {
  userId: string;
  id: number;
  data: Note;
}) => {
  const noteAlreadyExists = await UserModel.findOne({
    _id: userId,
    "notes.id": id,
  });

  if (noteAlreadyExists) {
    const { _id } = noteAlreadyExists;

    const response = await UserModel.updateOne(
      {
        _id,
        "notes.id": id,
      },
      {
        $set: {
          "notes.$.description": data.description,
          "notes.$.important": data.important,
        },
      },
      {
        upsert: true,
        new: true,
      }
    );
    console.log(response);
  } else {
    return "NOTE_NOT_FOUND";
  }
};
const deleteNote = async ({ userId, id }: { userId: string; id: number }) => {
  return await UserModel.updateOne(
    {
      _id: userId,
    },
    {
      $pull: {
        notes: { id },
      },
    },
    {
      upsert: true,
      new: true,
    }
  );
};
export { createNote, getNoteDetails, updateNote, deleteNote };
