import { check } from "express-validator";
import { NextFunction, Request, Response } from "express";
import validate from "../utils/validator.handle";

export const validateVetData = [
  check("name").exists().trim().notEmpty().withMessage("Name is required"),
  (req: Request, res: Response, next: NextFunction) => {
    validate(req, res, next);
  },
];
