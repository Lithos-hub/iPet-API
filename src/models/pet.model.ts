import { Schema, model } from "mongoose";
import { Pet } from "../interfaces/pet.interface";

const PetSchema = new Schema<Pet>(
  {
    name: {
      required: true,
      type: String,
      trim: true,
    },
    weight: {
      required: true,
      type: Number,
      trim: true,
    },
    weight_measure: {
      required: true,
      type: String,
      trim: true,
    },
    specie: {
      required: true,
      type: String,
      trim: true,
    },
    breed: {
      required: false,
      type: String,
      trim: true,
    },
    color: {
      required: true,
      type: String,
      trim: true,
    },
    sex: {
      required: true,
      type: String,
      trim: true,
    },
    birthday: {
      required: true,
      type: Number,
      trim: true,
    },
    userId: {
      required: true,
      type: String,
      trim: true,
    },
    imageUrl: {
      required: false,
      type: String,
      trim: true,
    },
    allergies: {
      required: false,
      type: [String],
    },
    spaying_status: {
      required: true,
      type: Boolean,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const PetModel = model("Pet", PetSchema);

export default PetModel;
