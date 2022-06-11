const { v4 } = require("uuid");
const uuidv4 = v4;

class Chats {
  constructor() {
    this.chats = {};
  }

  addChat(id) {
    const newChat = { id, messages: [] };
    this.chats[id] = newChat;
  }

  deleteChat(id) {
    delete this.chats[id];
  }

  getLastMessagesFromChat(id) {
    return this.chats[id]?.messages;
  }

  addMessageToChat(id, message) {
    if (!this.chats[id]) return;

    const chat = this.chats[id];

    const messageObj = { id: uuidv4(), message };

    chat.messages.unshift(messageObj);

    if (chat.messages.length > 10) chat.messages.pop();

    return messageObj;
  }
}

module.exports = Chats;
