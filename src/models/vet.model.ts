import { Schema, model } from "mongoose";
import { Vet } from "../interfaces/vet.interface";

const VetSchema = new Schema<Vet>(
  {
    name: {
      required: true,
      type: String,
      trim: true,
    },
    contact_phone: {
      required: false,
      type: String,
      trim: true,
    },
    emergency_phone: {
      required: false,
      type: String,
      trim: true,
    },
    city: {
      required: false,
      type: String,
      trim: true,
    },
    userId: {
      required: true,
      type: String,
      trim: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const VetModel = model("Vet", VetSchema);

export default VetModel;
