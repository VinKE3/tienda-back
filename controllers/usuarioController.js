var Usuario = require("../models/usuario");
var bcrypt = require("bcrypt-nodejs");
var jwt = require("../helpers/jwt");

const registro_usuario_admin = async (req, res) => {
  if (req.usuario) {
    let data = req.body;
    let usuarios = await Usuario.find({ email: data.email });

    if (usuarios.length >= 1) {
      res.status(200).send({ data: undefined, message: "El email ya existe" });
    } else {
      bcrypt.hash("123456", null, null, async function (err, hash) {
        if (err) {
          res.status(200).send({
            data: undefined,
            message: "Error al encriptar la contraseña",
          });
        } else {
          console.log(hash);
          data.password = hash;
          let usuario = await Usuario.create(data);
          res
            .status(200)
            .send({ data: usuario, message: "Usuario creado correctamente" });
        }
      });
    }
  } else {
    res.status(500).send({
      data: undefined,
      message: "No tienes permisos para realizar esta accion",
    });
  }
};

const login_usuario = async function (req, res) {
  var data = req.body;
  var usuario = await Usuario.find({ email: data.email });
  if (usuario.length >= 1) {
    bcrypt.compare(
      data.password,
      usuario[0].password,
      async function (err, check) {
        if (check) {
          res.status(200).send({
            token: jwt.createToken(usuario[0]),
            usuario: usuario[0],
          });
        } else {
          res
            .status(200)
            .send({ data: undefined, message: "Contraseña incorrecta" });
        }
      }
    );
  } else {
    res.status(200).send({
      data: undefined,
      message: "No se encontro el correo Electronico",
    });
  }
};

module.exports = {
  registro_usuario_admin,
  login_usuario,
};
