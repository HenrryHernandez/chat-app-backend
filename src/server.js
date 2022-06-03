const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

class Server {
  app;
  port;
  paths = {};

  constructor() {
    this.app = express();
    this.port = process.env.PORT || 8000;

    this.middlewares();
    this.database();
    this.routes();
  }

  middlewares() {
    this.app.use(cors());
    this.app.use(express.json());
  }

  database() {
    const DB = process.env.DATABASE.replace(
      "<PASSWORD>",
      process.env.DATABASE_PASSWORD
    );

    mongoose
      .connect(DB)
      .then((conn) => {
        console.log("DB connection successful");
      })
      .catch((error) => console.log(error));
  }

  routes() {}

  listen() {
    this.app.listen(this.port, () => {
      console.log("listening on port", this.port);
    });
  }
}

module.exports = Server;
