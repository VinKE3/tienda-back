var moongose = require("mongoose");
var Schema = moongose.Schema;

var UsuarioSchema = Schema({
  nombres: {
    type: String,
    required: true,
  },
  apellidos: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true, // No se puede repetir
  },
  rol: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  estado: {
    type: Boolean,
    default: true,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = moongose.model("usuario", UsuarioSchema);
