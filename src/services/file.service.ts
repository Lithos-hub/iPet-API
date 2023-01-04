import { File } from "../interfaces/file.interface";
import FileModel from "../models/file.model";

const uploadFile = async ({ name, path, mimeType, size }: File) => {
  return await FileModel.create({ name, path, mimeType, size });
};

const getFileByPetId = async (id: string) =>
  await FileModel.findOne({
    name: {
      $regex: id,
    },
  });

export { uploadFile, getFileByPetId };
