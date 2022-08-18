const express = require("express");
const { getUsers,searchUsers } = require("../controllers/user.controller");
const { userRequired } = require("../middleware/auth.middleware");
const { notFound } = require("../middleware/error.middleware");
const userRoute = express.Router();


userRoute.get("/", userRequired, getUsers);
userRoute.get("/:search", searchUsers);
 


userRoute.all("*", notFound);

module.exports = userRoute;