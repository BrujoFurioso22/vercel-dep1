import { Router } from "express";
import { userController } from "../controllers/user.controller.js";

export const userRouter = Router();

userRouter.post("/userId", userController.getIdUser);
userRouter.post("/userverif", userController.getVerificationUser);
userRouter.post("/getcliente", userController.getCliente);
userRouter.get("/getvendedores", userController.getVendedores);
userRouter.post("/actualizardatos", userController.actualizarDatos);
userRouter.post("/actualizarestado", userController.actualizarEstado);

// router.get("/:id", bookController.getById)
// router.post("/", bookController.create)
// router.put("/:id", bookController.updateById)
// router.delete("/:id", bookController.deleteById)
