import { check } from "express-validator";
import { NextFunction, Request, Response } from "express";
import validate from "../utils/validator.handle";

export const validateNoteData = [
  check("description")
    .exists()
    .trim()
    .notEmpty()
    .withMessage("Description is required"),
  (req: Request, res: Response, next: NextFunction) => {
    validate(req, res, next);
  },
];
