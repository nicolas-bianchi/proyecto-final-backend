const express = require("express");
const {
  newPublication,
  consultAllEstates,
  consultEstatesById,
  consultEstateBySearchBar,
  editPublication,
} = require("../controllers/estates");
const { runValidation } = require("../validations");
const { verifyToken } = require("../validations/auth");
const {
  newPublicationValidator,
  editPublicationValidator,
} = require("../validations/estatesValidations");

const router = express.Router();

router.get("/estates/publications", consultAllEstates);
router.get("/estates/publications/:id", consultEstatesById);
router.post("/estates/searchBar", consultEstateBySearchBar);
router.post(
  "/estates/newPublication",
  verifyToken,
  newPublicationValidator,
  runValidation,
  newPublication
);
// router.put(
//   "/estates/edit/:id",
//   editPublicationValidator,
//   runValidation,
//   editPublication
// );
module.exports = router;
