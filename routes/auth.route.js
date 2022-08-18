const express = require("express");
const {login,logout,update } = require("../controllers/auth.controller");
const { userRequired} = require("../middleware/auth.middleware");
const authRoute = express.Router();
 
authRoute.post("/login", login);
authRoute.post("/update",userRequired, update);
authRoute.post("/logout",userRequired, logout);
authRoute.post("/refreshToken");//not implemented

module.exports = authRoute;
 

