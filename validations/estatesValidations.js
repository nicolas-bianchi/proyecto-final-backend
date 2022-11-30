const { check } = require("express-validator");

exports.newPublicationValidator = [
  check("precio")
    .not()
    .isEmpty()
    .withMessage("El precio es requerido")
    .isNumeric()
    .withMessage("El precio debe ser un número"),
  check("dormitorios")
    .not()
    .isEmpty()
    .withMessage("La cantidad de dormitorios es requerida")
    .isNumeric()
    .withMessage("La cantidad de dormitorios debe ser un número"),
  check("tipoInmueble")
    .not()
    .isEmpty()
    .withMessage("El tipo de inmueble es requerido")
    .isString()
    .withMessage("El tipo de inmueble no debe contener números"),
  check("operacion")
    .not()
    .isEmpty()
    .withMessage("El tipo de operación es requerida"),
  check("gastosComunes")
    .isNumeric()
    .withMessage("Los gastos comunes deben ser un número"),
  check("metrosCuadrados")
    .not()
    .isEmpty()
    .withMessage("Los metros cuadrados son requeridos")
    .isNumeric()
    .withMessage("Los metros cuadrados deben ser un número"),
  check("departamento")
    .not()
    .isEmpty()
    .withMessage("El departamento es requerido")
    .isString()
    .withMessage("El departamento no debe contener números"),
  check("barrio")
    .not()
    .isEmpty()
    .withMessage("El barrio es requerido")
    .isString()
    .withMessage("El barrio no debe contener números"),
  check("calle")
    .not()
    .isEmpty()
    .withMessage("La calle es requerida")
    .isString()
    .withMessage("La calle no puede contener solo números"),
];
