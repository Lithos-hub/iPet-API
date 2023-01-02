import { Router } from "express";
import { signUp, signIn, getSession } from "../controllers/auth.controller";
import { checkJwt } from "../middlewares/session.middleware";
import { validateSignUp, validateSignin } from "../validators/users.validator";

const router = Router();

router.post("/join", validateSignUp, signUp);
router.post("/login", validateSignin, signIn);
router.post("/session", checkJwt, getSession);

export { router };
