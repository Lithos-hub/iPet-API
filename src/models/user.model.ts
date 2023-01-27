import { Model, Schema, model } from "mongoose";
import { User } from "../interfaces/user.interface";

const UserSchema = new Schema<User, Model<User>>(
  {
    email: {
      required: true,
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      required: true,
      type: String,
      trim: true,
    },
    pets: {
      required: true,
      type: [Object],
    },
    events: {
      required: true,
      type: [Object],
    },
    vets: {
      required: true,
      type: [Object],
    },
    contacts: {
      required: true,
      type: [Object],
    },
    notes: {
      required: true,
      type: [Object],
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const UserModel = model("User", UserSchema);

export default UserModel;
