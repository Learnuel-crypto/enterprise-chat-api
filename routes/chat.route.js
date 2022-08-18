const express = require("express");
const { getUserChats, sendMessage, deleteUserChat,getUserChatByLimit } = require("../controllers/chat.controller");
const { userRequired } = require("../middleware/auth.middleware");
const { notFound } = require("../middleware/error.middleware");
const chatRoute = express.Router();


chatRoute.get("/", userRequired, getUserChats);
chatRoute.get("/:limit", userRequired, getUserChatByLimit);
chatRoute.post("/", userRequired, sendMessage);
chatRoute.delete("/", userRequired, deleteUserChat);
 
chatRoute.all("*", notFound);

module.exports = chatRoute;
