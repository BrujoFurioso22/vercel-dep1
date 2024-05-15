import { Router } from "express";
import { ventasController } from "../controllers/ventas.controller.js";

export const ventasRouter = Router();

ventasRouter.post("/obtenerventasvendedor", ventasController.obtenerventas);
ventasRouter.post("/obtenertotales", ventasController.obtenertotales);
ventasRouter.post("/obtenerventasporcliente", ventasController.obtenerventasporcliente);

// router.get("/:id", bookController.getById)
// router.post("/", bookController.create)
// router.put("/:id", bookController.updateById)
// router.delete("/:id", bookController.deleteById)
