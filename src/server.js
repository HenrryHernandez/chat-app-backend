const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

class Server {
  app;
  port;
  paths = {
    users: "/api/v1/users",
    chats: "/api/v1/chats",
  };

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

  routes() {
    this.app.use(this.paths.users, require("./routes/users.routes"));
    this.app.use(this.paths.chats, require("./routes/chats.routes"));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("listening on port", this.port);
    });
  }
}

module.exports = Server;
