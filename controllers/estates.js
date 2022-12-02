const formidable = require("formidable");
const knex = require("../config/knexFile");
const fs = require("fs");

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

// PRUEBA FORMIDABLE Y FS
// exports.newPublication = async (req, res) => {
//   let form = new formidable.IncomingForm();
//   form.keepExtensions = true;
//   try {
//     form.parse(req, (err, fields, files) => {
//       if (err) {
//         return res.status(400).json({
//           error: "No se pudo cargar la imagen",
//         });
//       }
//       const {
//         precio,
//         dormitorios,
//         tipoInmueble,
//         operacion,
//         gastosComunes,
//         metrosCuadrados,
//         departamento,
//         ciudad,
//         barrio,
//         calle,
//       } = fields;
//       if (!precio || !precio.length) {
//         return res.status(400).json({ error: "El precio es obligatorio" });
//       }
//       try {
//         const newDirecciones = knex("direcciones")
//           .returning("direccionId")
//           .insert({
//             departamento: departamento,
//             ciudad: ciudad,
//             barrio: barrio,
//             calle: calle,
//           });
//         const newInmuebles = knex("inmuebles").insert({
//           precio: precio,
//           dormitorios: dormitorios,
//           tipoInmueble: tipoInmueble,
//           operacion: operacion,
//           gastosComunes: gastosComunes,
//           metrosCuadrados: metrosCuadrados,
//           direccionId: newDirecciones[0].direccionId,
//         });
//         res.json({ message: "Se ha ingresado el inmueble con éxito" });
//       } catch (error) {
//         res.status(400).json({ error: error.message });
//       }

//       let fileData;
//       let fileType;
//       if (files.file) {
//         if (files.file.size > 1000000) {
//           return res.status(400).json({
//             error: "Tamaño maximo de la imagen 1MB",
//           });
//         }
//         fileData = fs.readFileSync(files.file.filepath);
//         fileType = files.file.mimetype;
//         knex("inmuebles")
//           .where("direccionId", newDirecciones[0].direccionId)
//           .update({
//             filedata: fileData,
//             filetype: fileType,
//           })
//           .then(() => {
//             res.json({ success: true });
//             return;
//           })
//           .catch((error) => {
//             res.status(400).json({ error: error.message });
//             return;
//           });
//       }
//     });
//   } catch (e) {
//     console.log(e);
//     res.status(500).json({ error: e });
//   }
// };
