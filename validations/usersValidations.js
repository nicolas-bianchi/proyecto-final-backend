const { check } = require("express-validator");

exports.registerValidator = [
  check("email")
    .not()
    .isEmpty()
    .withMessage("El email es requerido")
    .isEmail()
    .withMessage("El formato de email es inválido"),
  check("password")
    .not()
    .isEmpty()
    .withMessage("La contraseña es requerida")
    .isLength({ min: 8, max: 120 })
    .withMessage("La contraseña debe tener un mínimo de 8 caracteres"),
  check("nombre")
    .not()
    .isEmpty()
    .withMessage("El nombre es requerido")
    .isString()
    .withMessage("El nombre no debe contener números"),
  check("apellido")
    .not()
    .isEmpty()
    .withMessage("El apellido es requerido")
    .isString()
    .withMessage("El nombre no debe contener números"),
  check("acceso")
    .not()
    .isEmpty()
    .withMessage("El acceso es requerido")
    .isNumeric()
    .withMessage("El acceso debe ser un número")
    .isLength({ min: 1, max: 1 })
    .withMessage("El acceso debe ser un único número"),
];

exports.loginValidator = [
  check("email")
    .not()
    .isEmpty()
    .withMessage("El email es requerido")
    .isEmail()
    .withMessage("El formato de email es inválido"),
  check("password")
    .not()
    .isEmpty()
    .withMessage("La contraseña es requerida")
    .isLength({ min: 8, max: 120 })
    .withMessage("La contraseña debe tener un mínimo de 8 caracteres"),
];
