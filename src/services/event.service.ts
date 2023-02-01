import { ObjectId } from "mongodb";
import { CalendarEvent } from "../interfaces/event.interface";
import UserModel from "../models/user.model";

const createEvent = async (_id: ObjectId, data: CalendarEvent) => {
  return await UserModel.findOneAndUpdate(
    {
      _id,
    },
    {
      $push: {
        events: {
          ...data,
          id: new Date().getTime(),
        },
      },
    }
  );
};

const getEventDetails = async (id: string): Promise<any> => {
  await UserModel.findOne(
    {
      "events.id": id,
    },
    (err: unknown, docs: unknown) => {
      if (err) return "NOT_FOUND";
      return docs;
    }
  );
};

const updateEvent = async ({
  userId,
  id,
  data,
}: {
  userId: string;
  id: number;
  data: CalendarEvent;
}) => {
  const eventAlreadyExists = await UserModel.findOne({
    _id: userId,
    "events.id": id,
  });

  if (eventAlreadyExists) {
    const { _id } = eventAlreadyExists;

    return await UserModel.updateOne(
      {
        _id,
        "events.id": id,
      },
      {
        $set: {
          "events.$.title": data.title,
          "events.$.bgColor": data.bgColor,
          "events.$.start": data.start,
          "events.$.end": data.end,
          "events.$.description": data.description,
          "events.$.date_type": data.date_type,
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
const deleteEvent = async ({ userId, id }: { userId: string; id: number }) => {
  return await UserModel.updateOne(
    {
      _id: userId,
    },
    {
      $pull: {
        events: { id },
      },
    },
    {
      upsert: true,
      new: true,
    }
  );
};
export { createEvent, getEventDetails, updateEvent, deleteEvent };
