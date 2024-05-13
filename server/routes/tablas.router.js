import { Router } from "express";
import { tablasController } from "../controllers/tablas.controller.js";

export const tablasRouter = Router();

tablasRouter.post("/insertarventa", tablasController.insertarVenta);
tablasRouter.post("/buscartabla", tablasController.obtenerDatosDeTabla);
tablasRouter.post("/obtenertablascliente", tablasController.obtenerTablasCliente);
tablasRouter.post("/obtenertablasventa", tablasController.obtenerTablasVenta);
tablasRouter.get("/probarcosas", tablasController.probarInsercionNueva);


// router.get("/:id", bookController.getById)
// router.post("/", bookController.create)
// router.put("/:id", bookController.updateById)
// router.delete("/:id", bookController.deleteById)
