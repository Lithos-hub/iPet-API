import { Router } from "express";
import { checkJwt } from "../middlewares/session.middleware";
import { validateVetData } from "../validators/vet.validator";

import {
  getUser,
  updateUser,
  deleteUser,
} from "../controllers/user.controller";

import { createPet, updatePet, deletePet } from "../controllers/pet.controller";
import { createVet, updateVet, deleteVet } from "../controllers/vet.controller";

const router = Router();

// user/ CRUD
router.get("/", checkJwt, getUser);
router.put("/:_id", checkJwt, updateUser);
router.delete("/:_id", checkJwt, deleteUser);

// user/pet CRUD
router.post("/pet/", checkJwt, createPet);
router.put("/pet/:id", checkJwt, updatePet);
router.delete("/pet/:id", checkJwt, deletePet);

// user/event CRUD
router.post("/event/", checkJwt);
router.put("/event/:id", checkJwt);
router.delete("/event/:id", checkJwt);

// user/vet CRUD
router.post("/vet/", checkJwt, validateVetData, createVet);
router.put("/vet/:id", checkJwt, updateVet);
router.delete("/vet/:id", checkJwt, deleteVet);

// user/contact CRUD
router.post("/contact/", checkJwt);
router.put("/contact/:id", checkJwt);
router.delete("/contact/:id", checkJwt);

// user/note CRUD
router.post("/note/", checkJwt);
router.put("/note/:id", checkJwt);
router.delete("/note/:id", checkJwt);

export { router };
