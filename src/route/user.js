import express from "express";
const router = express.Router();
import { REGISTER, LOGIN } from "../controller/user.js";
router.post("/register", REGISTER);
router.post("/login", LOGIN);
export default router;
