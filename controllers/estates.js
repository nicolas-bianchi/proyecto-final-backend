const knex = require("../config/knexFile");

exports.consultAllEstates = (req, res) => {
  knex("direcciones")
    .join("inmuebles", "direcciones.direccionId", "=", "inmuebles.direccionId")
    .then((response) => {
      res.json(response);
    })
    .catch((error) => {
      res.status(400).json({ error: error.message });
    });
};

exports.consultEstatesById = (req, res) => {
  id = req.params.id;
  knex("direcciones")
    .join("inmuebles", "direcciones.direccionId", "=", "inmuebles.direccionId")
    .where("direcciones.direccionId", id)
    .then((response) => {
      res.json(response);
    })
    .catch((error) => {
      res.status(400).json({ error: error.message });
    });
};

exports.newPublication = async (req, res) => {
  const {
    precio,
    dormitorios,
    tipoInmueble,
    operacion,
    gastosComunes,
    metrosCuadrados,
    departamento,
    ciudad,
    barrio,
    calle,
  } = req.body;
  try {
    const newDirecciones = await knex("direcciones")
      .returning("direccionId")
      .insert({
        departamento: departamento,
        ciudad: ciudad,
        barrio: barrio,
        calle: calle,
      });
    const newInmuebles = await knex("inmuebles").insert({
      precio: precio,
      dormitorios: dormitorios,
      tipoInmueble: tipoInmueble,
      operacion: operacion,
      gastosComunes: gastosComunes,
      metrosCuadrados: metrosCuadrados,
      direccionId: newDirecciones[0].direccionId,
    });
    res.json({ message: "Se ha ingresado el inmueble con éxito" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
