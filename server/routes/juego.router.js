import { Router } from "express";
import { juegoController } from "../controllers/juego.controller.js";

export const juegoRouter = Router();

juegoRouter.post("/nuevojuego", juegoController.nuevoJuego);
juegoRouter.post("/actualizardata", juegoController.actualizarData);
juegoRouter.post("/finalizarjuego", juegoController.finalizarJuego);
juegoRouter.get("/consultarjuegos", juegoController.buscarStatusJuegos);
juegoRouter.get("/historialjuegos", juegoController.buscarHistorialJuegos);
juegoRouter.get("/consultaraganar", juegoController.obtenerPosiblesCompletos);
juegoRouter.get("/consultaraganarrapida", juegoController.obtenerPosiblesRapidas);
juegoRouter.get("/consultarletrasaganar", juegoController.obtenerPosiblesLetras);

