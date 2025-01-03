import express from "express";
const router = express.Router();
import { POST_QUESTION } from "../controller/question.js";
import auth from "../utils/authorization.js";

router.post("/question", auth, POST_QUESTION);

export default router;
