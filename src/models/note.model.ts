import { Schema, model } from "mongoose";
import { Note } from "../interfaces/note.interface";

const NoteSchema = new Schema<Note>(
  {
    description: {
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

const NoteModel = model("Note", NoteSchema);

export default NoteModel;
