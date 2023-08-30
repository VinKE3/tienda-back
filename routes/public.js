var express = require("express");
var publicController = require("../controllers/publicController");

var api = express.Router();

api.get("/obtener_nuevos_productos", publicController.obtener_nuevos_productos);

module.exports = api;
