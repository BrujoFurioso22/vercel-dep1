import { Router } from "express";
import { juegoController } from "../controllers/juego.controller.js";

export const juegoRouter = Router();

juegoRouter.post("/nuevojuego", juegoController.nuevoJuego);
juegoRouter.post("/actualizardata", juegoController.actualizarData);
juegoRouter.post("/finalizarjuego", juegoController.finalizarJuego);

// router.get("/:id", bookController.getById)
// router.post("/", bookController.create)
// router.put("/:id", bookController.updateById)
// router.delete("/:id", bookController.deleteById)
