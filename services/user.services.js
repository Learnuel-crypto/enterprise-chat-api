const AccountModel = require("../models/account.model");

exports.getUsersService  = async () => {
  const account = await AccountModel.find();
 
  
  if (account.length !== 0) {
    const user = {};
    const details = account.map((cur) => {
      user.id = cur._id;
      user.username = cur.username;
      user.role = cur.role;
    });
    console.log(details);
    return {user: account };
  }
  return { msg: "There no user in the server" };
}
 
exports.searchUsersService = async (search) => {
  const account = await AccountModel.find({ username: search}||{role:search});
  if (account.length !== 0) {
    const user = {
      id: account._id,
      username: account.username,
      role:account.role,
    }
    return {user: user };
  }
  return { msg: "There no user in the server" };
 }