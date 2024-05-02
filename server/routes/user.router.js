import { Router } from "express";
import { userController } from "../controllers/user.controller.js";

export const userRouter = Router();

userRouter.get("/", userController.getAll);
userRouter.get("/userId", userController.getIdUser);
userRouter.post("/userverif", userController.getVerificationUser);

// router.get("/:id", bookController.getById)
// router.post("/", bookController.create)
// router.put("/:id", bookController.updateById)
// router.delete("/:id", bookController.deleteById)
