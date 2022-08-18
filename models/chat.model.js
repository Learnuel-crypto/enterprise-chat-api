const { Schema, model } = require("mongoose");

const ChatSchema = new Schema({
  senderId: {
    type: Schema.Types.ObjectId,
    ref: "account",
    required: true
  },
  receiverId: {
    type: Schema.Types.ObjectId,
    ref: "account",
    required: true
  },
 message: {
        type: String, required: true
  }
}, { timestamps: true });

const ChatModel = model("chat", ChatSchema);

module.exports = ChatModel;