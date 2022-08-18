const express = require("express");
const { getAccounts,
  register,
  getAccountById,  
  deleteAccountById, 
  updateAccountDetails} = require("../controllers/account.controller");
const { userRequired,adminRequired } = require("../middleware/auth.middleware");
const { notFound } = require("../middleware/error.middleware");
  
const accountRoute = express.Router();
accountRoute.post("/register",userRequired,adminRequired, register);  
accountRoute.get("/", userRequired, getAccounts);

accountRoute.get("/:id",userRequired,getAccountById);
accountRoute.delete("/:id",userRequired,adminRequired,deleteAccountById);
accountRoute.put("/",userRequired,updateAccountDetails);

accountRoute.all("*", notFound);
module.exports = accountRoute;