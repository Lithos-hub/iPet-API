import { Response } from "express";
import handleHttp from "../utils/error.handle";
import * as EventService from "../services/event.service";
import { ExtendedRequest } from "../interfaces/request.interface";

const createEvent = async ({ body, user }: ExtendedRequest, res: Response) => {
  const id = user?._id;
  try {
    const response = await EventService.createEvent(id, body);

    res.send(response);
  } catch (error) {
    handleHttp(res, "ERROR_CREATE_EVENT", 500);
  }
};
const updateEvent = async (
  { user, params, body }: ExtendedRequest,
  res: Response
) => {
  try {
    const userId = user?._id;
    const { id } = params;
    const eventId = Number(id);
    const response = await EventService.updateEvent({
      userId,
      id: eventId,
      data: body,
    });
    res.send(response);
  } catch (error) {
    handleHttp(res, "ERROR_PUT_EVENT", 500);
  }
};
const deleteEvent = async (
  { user, params }: ExtendedRequest,
  res: Response
) => {
  try {
    const userId = user?._id;
    const { id } = params;
    const eventId = Number(id);
    const response = await EventService.deleteEvent({ userId, id: eventId });
    res.send(response);
  } catch (error) {
    handleHttp(res, "ERROR_DELETE_EVENT", 500);
  }
};

export { createEvent, updateEvent, deleteEvent };
