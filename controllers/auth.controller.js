
const {compareSync } = require("bcryptjs");
const { sign } = require("JsonWebToken");
const UserLogModel = require("../models/log.model");
const {logoutService,updateService,isUserLoggedService } = require("../services/account.services");
const {getUserByUsername } = require("../services/login.services");
 
exports.login = async (req, res, next) => {
  try { 
    if (!req.body.username || !req.body.password) {
      const err = new Error("username and password is required");
      err.status = 400;
      return next(err);
    } 
    const { username, password } = req.body;
    
    const findUser = await getUserByUsername(username);//get user by username
    if (!findUser) {
      const err = new Error("User NOT found");
      err.status = 404;
     return next(err);
    }  
    const isLogged = await isUserLoggedService(findUser._id);
    if (isLogged) {
       const err = new Error("Account is actively logged in");
      err.status = 401;
      return next(err);
    }
    const isValidPass = compareSync(password, findUser.password); 
    if (!isValidPass) {
      const err = new Error("Incorrect username or password");
      err.status = 400;
      return next(err);
    }
    
     const user = {
      id: findUser._id,
      username: username,
        role: findUser.role,
        firstname:findUser.firstname,
        lastname:findUser.lastname,
      contact: findUser.contact,
    
    };
    const secret = process.env.JWT_SECRET_TOKEN;
    const payload = { id: user.id, role: user.role };
    const token =  sign(payload, secret, { expiresIn: "1h" });
    const refreshToken =  sign(payload, secret, { expiresIn: "6d" }); 
    
   findUser.refreshToken = refreshToken;
   findUser.save(); 
    const log={userid:findUser._id,description:"logged in"}
      await UserLogModel.create({...log});
      
   return  res.status(200).json({success:"Login success",user,token,refreshToken});
  } catch (error) {
    console.log(error.name);
    next(error);
  }
};
  
exports.logout = async (req, res, next) => {
  try {   
    
    const loggedOut = await logoutService(req.body);
    if (!loggedOut.success) {
      res.status(400).json(loggedOut);
    }
    res.status(200).json(loggedOut);
  } catch (error) {
    next(error);
  }
}
  
exports.update = async (req, res, next) => {
  try { 
    if (!req.username || !req.password)
      res.status(400).json("username and or password is required");
    
    const updateUser = await updateService(req.body);
    if (!updateUser.success) {
      res.status(400).json(updateUser);
    }
    res.status(200).json(updateUser);
  } catch (error) {
    next(error);
  }
};

exports.isLoggedIn = async (req, res, next) => {
  try { 
    return isUserLogged = await isUserLoggedService(req.body.id);
  } catch (error) {
    next(error);
  }
}