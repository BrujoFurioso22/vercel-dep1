import { Router } from "express";
import { descripcionController } from "../controllers/descripciones.controller.js";

export const descripcionesRouter = Router();

descripcionesRouter.get("/obtenerdescripciones", descripcionController.obtenerdescripciones);
descripcionesRouter.post("/insertardescripciones", descripcionController.insertardescripciones);


// router.get("/:id", bookController.getById)
// router.post("/", bookController.create)
// router.put("/:id", bookController.updateById)
// router.delete("/:id", bookController.deleteById)
