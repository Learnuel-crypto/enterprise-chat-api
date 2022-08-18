 const AccountModel = require("../models/account.model");
const UserRole = require("../models/accountrole.model");
const UserLogModel = require("../models/log.model");
 
exports.createAccountService = async (data) => {
  try { 
    let checked;
    const validRoles = await UserRole.find();  
    validRoles.map((cur) => {
       checked = cur.role.find(a => a.toLowerCase() === data.role.toLowerCase());
      if (!checked)
        return checked;
    });  
    if (!checked)
      return { error: "User role is invalid" };
    await AccountModel.create({ ...data });
    return { success: "account created" };
  } catch (error) { 
    if (error.name=== "MongoServerError") { 
      return { error: "Username or contact has duplicate" };
    }
    return { error: error.message };
  }
}
 
exports.getAllAccountService  = async () => {
  const account = await AccountModel.find();
  if (account.length !==0) {
    return {accounts: account };
  }
  return { msg: "There no account in the server" };
 }
exports.getAccountByIdService  = async (accountId) => {
  try { 
    const account = await AccountModel.findById( accountId);
    if (account) {
      return { account: account };
    }
    return { msg: "Account not found" };
  } catch (error) {
    return { error: "Invalid account id" };
    }
}
 
exports.deleteAccountByIdService = async (infor) => {
  try { 
    let userToDelete;  
   //user deleting the account
    if (infor.id === infor.userid) {
      //  return { msg: "Authorization failed" };
      userToDelete = await AccountModel.findByIdAndDelete(infor.userid);
    } else { 
      userToDelete = await AccountModel.findById(infor.userid);
      if (!userToDelete)
        return { msg: "User Not found" };
      // check if user is want to delete account higher than his
      userToDelete.role = userToDelete.role.toLowerCase();
      infor.role = infor.role.toLowerCase();
    
      if (userToDelete.role.toLowerCase() === "ceo" && infor.role === "administrator" || infor.role === "manager" || infor.role === "secretary") {
        return { error: "Authorization failed" };
      } else if (userToDelete.role.toLowerCase() === "administrator" && infor.role === "manager" || infor.role === "secretary") {
        return { error: "Authorization failed" };
      } else if (userToDelete.role.toLowerCase() === "manager" && infor.role === "secretary") {
        return { error: "Authorization failed" };
      } else {
        userToDelete = await AccountModel.findByIdAndDelete(infor.userid);
      }
    }
    return { success:"Account deleted"};
  } catch (error) { 
      return { error: error.message };
  }
}

exports.updateAccountService = async (data) => {
  try {
    
    let updatedAccount;
    if (data.id) { 
       updatedAccount = await AccountModel.findByIdAndUpdate(data.id, { ...data }, { new: true })
    }
    else if (!data.id || data.username && data.password) { 
      updatedAccount = await AccountModel.findOneAndUpdate({ username: data.username, password: data.password }, {...data},{new:true}); 
    }   
  
    if (updatedAccount) {
      return { success: "Account updated", updatedAccount: updatedAccount };
    }
    return { msg: "Account not found" };
  } catch (error) {
     return { error: error.message};
  }
} 
exports.contactExistService  = async (data) => {
  const exist = await AccountModel.findOne({ contact: data });
  if (!exist)
    return false;
  return true;

} 
 exports.usernameExistService  = async (data) => {
  const exist = await AccountModel.findOne({ username: data });
  if (!exist)
    return false;
  return true;
}


exports.logoutService = async (data) => {
  try {
    const user = await AccountModel.findById(data.id);
    if (!user)
      return { error: "User Not found" };
    user.refreshToken = "none";
    user.save();
   //log user activities
    const log = { userid: data.id, description: "logged out" };
   await UserLogModel.create({ ...log });
    return { success: "User logged out"};
  } catch (error) {
    return { error: error };
   }
}
 
exports.isUserLoggedService = async (userid) => {
  const user = await AccountModel.findById(userid);
    if (user.refreshToken ==="none" || user.refreshToken ==="")
       return false;
  return true;
}