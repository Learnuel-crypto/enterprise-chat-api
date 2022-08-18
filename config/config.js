const AccountModel = require("../models/account.model");
const UserRole = require("../models/accountrole.model");
const { mongodbConnect } = require("./db.config");
const { hashSync} = require("bcryptjs");

 mongodbConnect();
const pass = hashSync("nevergrowold", 12);
 const user = new AccountModel({
  firstname: "Learnuel",
  lastname: "Technologies",
  contact: "08113664697",
  role:"Administrator",
  username: "Learnueltech",
  password:pass,
 });
user.save((err)=>{
  if (err) return handleError(err);
})
 