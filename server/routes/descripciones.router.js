import { Router } from "express";
import { descripcionController } from "../controllers/descripciones.controller.js";

export const descripcionesRouter = Router();

descripcionesRouter.get("/obtenerdescripcionnormal", descripcionController.obtenerdescripcionesnormal);
descripcionesRouter.get("/obtenerdescripcionrapida", descripcionController.obtenerdescripcionesrapida);
descripcionesRouter.post("/actualizardescripcionnormal", descripcionController.insertardescripcionesnormal);
descripcionesRouter.post("/actualizardescripcionrapida", descripcionController.insertardescripcionesrapida);

