const express = require("express");
const { userLogin, resetLogin, userLogOut } = require("../controllers/login.controller");
const { notFound } = require("../middleware/error.middleware");
const { logOut } = require("../services/login.services");
const loginRoute = express.Router();

loginRoute.get("/", userLogin);
loginRoute.put("/", resetLogin);
loginRoute.put("/:id", userLogOut);

loginRoute.all("*", notFound);
module.exports = loginRoute;

