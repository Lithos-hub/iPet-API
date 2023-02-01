import { Response } from "express";
import handleHttp from "../utils/error.handle";
import * as NoteService from "../services/note.service";
import { ExtendedRequest } from "../interfaces/request.interface";

const createNote = async ({ body, user }: ExtendedRequest, res: Response) => {
  const id = user?._id;
  try {
    const response = await NoteService.createNote(id, body);

    res.send(response);
  } catch (error) {
    handleHttp(res, "ERROR_CREATE_NOTE", 500);
  }
};
const updateNote = async (
  { user, params, body }: ExtendedRequest,
  res: Response
) => {
  try {
    const userId = user?._id;
    const { id } = params;
    const noteId = Number(id);
    const response = await NoteService.updateNote({
      userId,
      id: noteId,
      data: body,
    });
    res.send(response);
  } catch (error) {
    handleHttp(res, "ERROR_PUT_NOTE", 500);
  }
};
const deleteNote = async ({ user, params }: ExtendedRequest, res: Response) => {
  try {
    const userId = user?._id;
    const { id } = params;
    const noteId = Number(id);
    const response = await NoteService.deleteNote({ userId, id: noteId });
    res.send(response);
  } catch (error) {
    handleHttp(res, "ERROR_DELETE_NOTE", 500);
  }
};

export { createNote, updateNote, deleteNote };
