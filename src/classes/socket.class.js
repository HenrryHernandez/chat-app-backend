const Chats = require("./chats.class");
const Chat = require("../models/chats.model");

class Socket {
  constructor(io) {
    this.io = io;

    this.chats = new Chats();

    this.addChats();

    this.socketEvents();
  }

  async addChats() {
    const chats = await Chat.find().select("_id");
    chats.forEach((chat) => this.chats.addChat(chat._id.toString()));
  }

  socketEvents() {
    this.io.on("connection", (socket) => {
      console.log("new client connected");

      socket.on("get-current-messages", (id, callback) => {
        callback(this.chats.getLastMessagesFromChat(id));
      });

      socket.on("set-new-message", (id, message) => {
        const messageObj = this.chats.addMessageToChat(id, message);
        socket.broadcast.emit(id, messageObj);
      });
    });
  }
}

module.exports = Socket;
