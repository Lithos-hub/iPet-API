import { check } from "express-validator";
import { NextFunction, Request, Response } from "express";
import validate from "../utils/validator.handle";

export const validateData = [
  check("name").exists().trim().notEmpty(),
  check("weight").exists().trim().notEmpty().isNumeric(),
  check("weight_measure").exists().trim().notEmpty(),
  check("specie").exists().trim().notEmpty(),
  check("color").exists().trim().notEmpty(),
  check("sex").exists().trim().notEmpty(),
  check("birthday").exists().notEmpty().isNumeric(),
  (req: Request, res: Response, next: NextFunction) => {
    validate(req, res, next);
  },
];
