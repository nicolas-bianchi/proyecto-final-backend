const express = require("express");
const { login, register } = require("../controllers/users");
const { runValidation } = require("../validations");
const {
  registerValidator,
  loginValidator,
} = require("../validations/usersValidations");

const router = express.Router();

router.post("/users/login", loginValidator, runValidation, login);
router.post("/users/register", registerValidator, runValidation, register);

module.exports = router;
