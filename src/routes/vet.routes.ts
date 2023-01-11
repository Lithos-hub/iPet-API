import { Router } from "express";
import { checkJwt } from "../middlewares/session.middleware";

import {
  createVet,
  getVets,
  updateVet,
  deleteVet,
} from "../controllers/vet.controller";

const router = Router();
router.get("/:userId", checkJwt, getVets);
router.post("/", checkJwt, createVet);
router.put("/:_id", checkJwt, updateVet);
router.delete("/:_id", checkJwt, deleteVet);

export { router };
