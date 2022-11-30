const knex = require("../config/knexFile");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.login = (req, res) => {
  const { email, password } = req.body;
  knex("usuarios")
    .where({ email: email })
    .then(async (result) => {
      if (!result.length) {
        res.status(404).json({
          error: "Email y/o contraseña incorrecta/s",
        });
        return;
      }
      const validatePassword = await bcrypt.compare(
        password,
        result[0].password
      );
      if (!validatePassword) {
        res.status(404).json({
          error: "Email y/o contraseña incorrecta/s",
        });
        return;
      }
      const token = jwt.sign(
        {
          nombre: result[0].nombre,
          email: result[0].email,
          permiso: result[0].permiso,
        },
        process.env.TOKEN_SECRET
      );

      res.json({ success: true, token: token });
    });
};

exports.register = async (req, res) => {
  const { nombre, apellido, email, password, acceso } = req.body;
  const salt = await bcrypt.genSalt(10);
  const passwordEncrypt = await bcrypt.hash(password, salt);
  knex("usuarios")
    .where("email", email)
    .then((respuesta) => {
      if (respuesta.length) {
        res.status(400).json({ error: "El email ya está siendo utilizado" });
        return;
      }
      knex("usuarios")
        .insert({
          nombre: nombre,
          apellido: apellido,
          email: email,
          password: passwordEncrypt,
          acceso: acceso,
        })
        .then(() => {
          res.json([
            {
              success: true,
              mensaje: "Se ha registrado correctamente",
            },
          ]);
        })
        .catch((error) => {
          res.status(400).json({ error: error.message });
        });
    })
    .catch((error) => {
      res.status(400).json({ error: error.message });
    });
};
