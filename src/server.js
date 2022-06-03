const express = require("express");
const cors = require("cors");

class Server {
  app;
  port;
  paths = {};

  constructor() {
    this.app = express();
    this.port = process.env.PORT || 8000;

    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(cors());
    this.app.use(express.json());
  }

  routes() {}

  listen() {
    this.app.listen(this.port, () => {
      console.log("listening on port", this.port);
    });
  }
}

module.exports = Server;
