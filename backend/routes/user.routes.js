import express from "express";
import {
  getCurrentUser,
  UpdateAssistant,
} from "../controller/user.controllers.js";
import { isAuth } from "../middleware/isAuth.js";
import upload from "../middleware/Multer.js";
const userRouter = express.Router();

userRouter.get("/current", isAuth, getCurrentUser);
userRouter.put(
  "/update",
  isAuth,
  upload.single("assistantImage"),
  UpdateAssistant,
);

export default userRouter;
