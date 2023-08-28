var express = require("express");
var moongose = require("mongoose");
var bodyparser = require("body-parser");
var port = process.env.PORT || 4201;
var app = express();

var cliente_router = require("./routes/cliente");
var usuario_router = require("./routes/usuario");
var producto_router = require("./routes/producto");

app.use(bodyparser.urlencoded({ limit: "50mb", extended: true }));
app.use(bodyparser.json({ limit: "50mb", extended: true }));

moongose.connect("mongodb://127.0.0.1:27017/tienda");

moongose.connection.on(port, function () {
  app.listen(port, function () {
    console.log("Servidor del api rest escuchando en http://localhost:" + port);
  });
});

app.listen(port, function () {
  console.log("Server running on port " + port);
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
