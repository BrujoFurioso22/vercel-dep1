const express = require("express")
const router = express.Router()

const userController = require('../controllers/user.controller')

router.get("/", userController.getAll)
// router.get("/:id", bookController.getById)
// router.post("/", bookController.create)
// router.put("/:id", bookController.updateById)
// router.delete("/:id", bookController.deleteById)
//HOLA SI SE CAMBIO
//ya me molesto el chavo
//tercera prueba

module.exports = router