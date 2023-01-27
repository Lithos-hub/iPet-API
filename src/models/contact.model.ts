import { Schema, model } from "mongoose";
import { Contact } from "../interfaces/contact.interface";

const ContactSchema = new Schema<Contact>(
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
    contact_phone_2: {
      required: false,
      type: String,
      trim: true,
    },
    city: {
      required: false,
      type: String,
      trim: true,
    },
    email: {
      required: true,
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

const ContactModel = model("Contact", ContactSchema);

export default ContactModel;
