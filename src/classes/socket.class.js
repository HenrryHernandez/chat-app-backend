class Socket {
  constructor(io) {
    this.io = io;

    this.socketEvents();
  }

  socketEvents() {
    this.io.on("connection", (socket) => {
      console.log("new client");

      socket.on("activate-chat", (chatId) => {
        console.log(chatId);
      });
    });
  }
}

module.exports = Socket;
