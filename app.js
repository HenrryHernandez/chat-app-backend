const dotenv = require("dotenv");
const Server = require("./src/server");

dotenv.config();

const server = new Server();

server.listen();
