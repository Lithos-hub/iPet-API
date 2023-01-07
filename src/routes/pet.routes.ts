import { Router } from "express";
import { checkJwt } from "../middlewares/session.middleware";
import { validateData } from "../validators/pet.validator";
import {
  createPet,
  getPet,
  getPets,
  updatePet,
  deletePet,
} from "../controllers/pet.controller";

const router = Router();

router.post("/", checkJwt, validateData, createPet);
router.get("/:userId", checkJwt, getPets);
router.get("/details/:_id", checkJwt, getPet);
router.put("/:_id", checkJwt, validateData, updatePet);
router.delete("/:_id", checkJwt, deletePet);

export { router };
