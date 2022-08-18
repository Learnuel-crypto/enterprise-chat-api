const { model } = require("mongoose");
const ChatModel = require("../models/chat.model");
exports.sendChat = async (details) => {
  try { 
    const chat = await ChatModel.create({...details
    });
    if (!chat) {
      return { error: chat };
    } 
    return { success: chat };
  } catch (error) {
    return { error: error.message };
        }
};

exports.getChats = async (details) => {
  try {  
    const chats = await ChatModel.find({
      senderId: details.id,receiverId:details.receiverId
    });
    if (!chats) {
      return { error: chats };
    }  
    return chats;
  } catch (error) {
    return { error: error.message };
        }
}
exports.getChatsByLimit = async (details) => {
  try {  
 
    const chats = await ChatModel.find({
      senderId: details.id,receiverId:details.receiverId
    }).limit(details.limit) ;
    if (!chats) {
      return { error: chats };
    }   
    if (chats.length===0)
      return { msg: "No chat" };
    return chats;
  } catch (error) {
    return { error: error.message };
        }
}

exports.deleteChat = async (details) => {
  try {  
 
    const chats = await ChatModel.findOneAndDelete({
      senderId: details.id,_id:details.chatid
    });
    if (!chats) {
      return { error: chats };
    }   
    if (chats.length===0)
      return { msg: "No chat Found" };
    return {success:"Chat deleted successfully"};
  } catch (error) {
    return { error: error.message };
        }
}

