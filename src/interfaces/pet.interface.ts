import { ObjectId } from "mongodb";

export interface Pet {
  _id: ObjectId;
  userId: string;
  name: string;
  weight: number;
  weight_measure: "lbs" | "kg";
  specie: string;
  breed: string;
  color: string;
  sex: "male" | "female";
  birthday: number; // milliseconds
  imageUrl: string;
}
