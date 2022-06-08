const http = require("http");
const express = require("express");
const mongoose = require("mongoose");
const socketio = require("socket.io");
const cors = require("cors");
const Socket = require("./classes/socket.class");

class Server {
  paths = {
    users: "/api/v1/users",
    chats: "/api/v1/chats",
    auth: "/api/v1/auth",
  };

  constructor() {
    this.app = express();
    this.port = process.env.PORT || 8000;
    this.server = http.createServer(this.app);
    this.io = socketio(this.server, {});

    this.middlewares();
    this.configureSockets();
    this.database();
    this.routes();
  }

  middlewares() {
    this.app.use(cors());
    this.app.use(express.json());
  }

  configureSockets() {
    new Socket(this.io);
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
    this.app.use(this.paths.auth, require("./routes/auth.routes"));
  }

  listen() {
    // this.app.listen(this.port, () => {
    //   console.log("listening on port", this.port);
    // });
    this.server.listen(this.port, () => {
      console.log("listening on port", this.port);
    });
  }
}

module.exports = Server;
