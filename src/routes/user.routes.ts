import { Router } from "express";
import { checkJwt } from "../middlewares/session.middleware";

import { createPet, updatePet, deletePet } from "../controllers/pet.controller";
import { createVet, updateVet, deleteVet } from "../controllers/vet.controller";
import {
  getUser,
  updateUser,
  deleteUser,
} from "../controllers/user.controller";
import {
  createContact,
  updateContact,
  deleteContact,
} from "../controllers/contact.controller";
import {
  createNote,
  updateNote,
  deleteNote,
} from "../controllers/note.controller";
import {
  createEvent,
  updateEvent,
  deleteEvent,
} from "../controllers/event.controller";

import { validateVetData } from "../validators/vet.validator";
import { validateContactData } from "../validators/contact.validator";
import { validateNoteData } from "../validators/note.validator";
import { validateEventData } from "../validators/event.validator";

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
router.post("/event/", checkJwt, validateEventData, createEvent);
router.put("/event/:id", checkJwt, updateEvent);
router.delete("/event/:id", checkJwt, deleteEvent);

// user/vet CRUD
router.post("/vet/", checkJwt, validateVetData, createVet);
router.put("/vet/:id", checkJwt, updateVet);
router.delete("/vet/:id", checkJwt, deleteVet);

// user/contact CRUD
router.post("/contact/", checkJwt, validateContactData, createContact);
router.put("/contact/:id", checkJwt, updateContact);
router.delete("/contact/:id", checkJwt, deleteContact);

// user/note CRUD
router.post("/note/", checkJwt, validateNoteData, createNote);
router.put("/note/:id", checkJwt, updateNote);
router.delete("/note/:id", checkJwt, deleteNote);

export { router };
