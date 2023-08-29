var express = require("express");
var moongose = require("mongoose");
var bodyparser = require("body-parser");
require("dotenv").config();
var port = process.env.PORT || 4201;
var app = express();

var cliente_router = require("./routes/cliente");
var usuario_router = require("./routes/usuario");
var producto_router = require("./routes/producto");

app.use(bodyparser.urlencoded({ limit: "50mb", extended: true }));
app.use(bodyparser.json({ limit: "50mb", extended: true }));

moongose.connect(process.env.MONGO_URL);
moongose.createConnection(process.env.MONGO_URL);
moongose.connection.on("error", function (err) {
  console.log("Error de conexion a la base de datos: " + err);
  process.exit();
});

moongose.connection.on("open", function () {
  console.log("Conectado a la base de datos correctamente");
  app.listen(port, function () {
    console.log(process.env.MONGO_URL);
  });
});

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Access-Control-Allow-Request-Method"
  );
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
  res.header("Allow", "GET, PUT, POST, DELETE, OPTIONS");
  next();
});

app.use("/api", cliente_router);
app.use("/api", usuario_router);
app.use("/api", producto_router);
module.exports = app;
