 
const AccountModel = require("../models/account.model"); 
const UserLogStatus = require("../models/userlogstatus.model");

exports.getUserByUsername = async (username) => {
  const user = await AccountModel.findOne({ username });
  return  user ;
}

exports.login = async({user}) => {
  try {
      
    //check if user is already logged in 
    const status = await UserLogStatus.find({userId:account._id}); 
    if (status.length !==0) {
      return { msg: "Account is already logged in on another device" };
    }
    await UserLogStatus.create({userId:account._id});
    return { success: "login successful", account: account };
  } catch (error) {
    return { error: error.message };
  }
};
exports.logoutService = async (userid) => {
   try {
    if (!userid) {
      return { error: "userid is required" };
    }

    const account = await AccountModel.findById(userid);
   
    if (!account) {
      return { msg: "Account does not exist" };
     } 
    //check if user is already logged in 
    const status = await UserLogStatus.find({userId:userid}).populate("account"); 
    if (status.length !==0) {
      return { msg: "Account is not logged in" };
    }
    await UserLogStatus.findOneAndDelete({userId:status.UserId});
    return { success: "logout successful", account: account };
  } catch (error) {
    return { error: "Invalid userid" };
  }
}

exports.resetLogin = async (accountId,details) => {
  try {
    const updateUser = await AccountModel.findByIdAndUpdate(accountId, { ...details }, { new: true });
    if (!updateUser) {
      return { msg: "Account not found" };
    } 
    return { success: "Account updated", user: updateUser };
  } catch (error) {
    return { error: error.message };
  }
}