const express = require("express");
const router = express.Router();
const {
  getMotoristas,
  getMotoristaById,
  createMotorista,
  updateMotorista,
  deleteMotorista,
} = require("../controllers/motoristaController");

router.get("/", getMotoristas);
router.get("/:id", getMotoristaById);
router.post("/", createMotorista);
router.put("/:id", updateMotorista);
router.delete("/:id", deleteMotorista);

module.exports = router;
