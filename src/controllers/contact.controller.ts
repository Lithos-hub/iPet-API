import { Response } from "express";
import handleHttp from "../utils/error.handle";
import * as ContactService from "../services/contact.service";
import { ExtendedRequest } from "../interfaces/request.interface";

const createContact = async (
  { body, user }: ExtendedRequest,
  res: Response
) => {
  const id = user?._id;
  try {
    const response = await ContactService.createContact(id, body);

    res.send(response);
  } catch (error) {
    handleHttp(res, "ERROR_CREATE_CONTACT", 500);
  }
};
const updateContact = async (
  { user, params, body }: ExtendedRequest,
  res: Response
) => {
  try {
    const userId = user?._id;
    const { id } = params;
    const contactId = Number(id);
    const response = await ContactService.updateContact({
      userId,
      id: contactId,
      data: body,
    });
    res.send(response);
  } catch (error) {
    handleHttp(res, "ERROR_PUT_CONTACT", 500);
  }
};
const deleteContact = async (
  { user, params }: ExtendedRequest,
  res: Response
) => {
  try {
    const userId = user?._id;
    const { id } = params;
    const contactId = Number(id);
    const response = await ContactService.deleteContact({
      userId,
      id: contactId,
    });
    res.send(response);
  } catch (error) {
    handleHttp(res, "ERROR_DELETE_CONTACT", 500);
  }
};

export { createContact, updateContact, deleteContact };
