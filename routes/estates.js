const express = require("express");
const {
  newPublication,
  consultAllEstates,
  consultEstatesById,
} = require("../controllers/estates");
const { runValidation } = require("../validations");
const {
  newPublicationValidator,
} = require("../validations/estatesValidations");

const router = express.Router();

router.get("/estates/publications", consultAllEstates);
router.get("/estates/publications/:id", consultEstatesById);
router.post(
  "/estates/newPublication",
  newPublicationValidator,
  runValidation,
  newPublication
);

module.exports = router;
