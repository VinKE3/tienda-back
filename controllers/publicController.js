var Producto = require("../models/producto");

const obtener_nuevos_productos = async function (req, res) {
  var productos = await Producto.find().sort({ createdAt: -1 }).limit(4);
  res.status(200).send(productos);
};

module.exports = {
  obtener_nuevos_productos,
};
