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

    chat.messages.unshift(message);

    if (chat.messages.length > 10) chat.messages.pop();
  }
}

module.exports = Chats;
