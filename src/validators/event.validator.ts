import { check } from "express-validator";
import { NextFunction, Request, Response } from "express";
import validate from "../utils/validator.handle";

export const validateEventData = [
  check("title").exists().trim().notEmpty().withMessage("Title is required"),
  (req: Request, res: Response, next: NextFunction) => {
    validate(req, res, next);
  },
];
