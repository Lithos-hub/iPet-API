import { Request, Response } from "express";
import { ExtendedRequest } from "../interfaces/request.interface";
import { File } from "../interfaces/file.interface";
import { uploadFile, getFileByPetId } from "../services/file.service";
import handleHttp from "../utils/error.handle";

const postFile = async ({ file }: ExtendedRequest, res: Response) => {
  try {
    const response: File = await uploadFile({
      name: String(file?.originalname),
      path: String(file?.path),
      mimeType: String(file?.mimetype),
      size: Number(file?.size),
    });
    res.send(response);
  } catch (error) {
    handleHttp(res, "ERROR_POST_FILE", 500);
  }
};
const getFile = async ({ params }: Request, res: Response) => {
  try {
    const { id } = params; // Pet ID
    const response = await getFileByPetId(id);
    res.send(response || "NOT_FOUND");
  } catch (error) {
    handleHttp(res, "ERROR_GET_FILE", 500);
  }
};
export { postFile, getFile };
