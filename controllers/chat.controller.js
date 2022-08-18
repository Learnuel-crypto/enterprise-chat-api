const { sendChat,getChats,getChatsByLimit,deleteChat } = require("../services/chat.service");

exports.getUserChats = async (req, res, next) => {
  try {
    if (!req.body.receiverId) {
      const err = new Error("Receiver id is required" )
      err.status = 400;
      return next(err);
    }
    const chats = await getChats(req.body);
    if (!chats) {
      res.status(200).json({ msg: "No message" });
    }
    res.status(200).json(chats);
  } catch (error) {
    next(error);
  }
}
exports.getUserChatByLimit = async (req, res, next) => {
  try {
  
    if (!req.body.receiverId) {
      const err = new Error("Receiver id is required" )
      err.status = 400;
      return next(err);
    }
    if (!req.query.limit) {
      const err = new Error("Limit is required" )
      err.status = 400;
      return next(err);
    }
    const details = { ...req.query,...req.body };  
    const chats = await getChatsByLimit(details);
    if (!chats) {
      res.status(200).json({ msg: "No message" });
    }
    res.status(200).json(chats);
  } catch (error) {
    next(error);
  }
}
exports.sendMessage = async (req, res, next) => {
  try {
    if (!req.body.receiverId) {
      const err = new Error("Receiver id is required" )
      err.status = 400;
      return next(err);
    }
    if (!req.body.message) { 
       const err = new Error("Message body is required" )
      err.status = 400;
      return next(err);
    }
     
    const chat = {
      senderId: req.body.id,
      receiverId:req.body.receiverId, 
    }
    const message = await getChats(chat);
    if (!message.success) {
      return next(message);
    }
    res.status(201).json(message); 
  } catch (error) {
    next(error);
  }
};
exports.deleteUserChat = async (req, res, next) => {
  try {
    if (!req.query.chatid) {
       const err = new Error("Chat id is required" )
      err.status = 400;
      return next(err);
    }
    const details = { ...req.query, ...req.body };
    const delChat = await deleteChat(details);
    res.status(200).json(delChat);
  } catch (error) {
    next(error);
  }
};
