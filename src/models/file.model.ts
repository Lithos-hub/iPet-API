import { Schema, model } from "mongoose";
import { File } from "../interfaces/file.interface";

const FileSchema = new Schema<File>(
  {
    name: {
      type: String,
    },
    path: {
      type: String,
    },
    mimeType: {
      type: String,
    },
    size: {
      type: Number,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const FileModel = model("File", FileSchema);

export default FileModel;
