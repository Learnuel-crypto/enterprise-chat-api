
const { createAccountService, getAccountByIdService, getAllAccountService, contactExistService, usernameExistService, deleteAccountByIdService, updateAccountService } = require("../services/account.services");
const { hashSync } = require("bcryptjs");
exports.getAccounts = async (req, res, next) => {
  try { 
   const accounts= await getAllAccountService();
    res.status(200).json(accounts);
  } catch (error) {
    next(error);
  }
}
 
exports.getAccountById = async (req, res, next) => {
  try { 
    const account = await getAccountByIdService(req.body.id)
    res.status(200).json(account);
  } catch (error) {
    next(error);
  }
  
}
  exports.updateAccountDetails = async (req, res, next) => {
    try { 
      const data = {};
      for (key in req.body) {
        if (key !== "username" || key !== "password" || key !=="id" || key !=="role") {
          data[key] = req.body[key];
        }
      }
      let nameExist=false;
      if (data.username)
        nameExist = usernameExistService(data.username);
      if (nameExist)
        res.status(400).json({ msg: "Username is not available" });
    const updated = await updateAccountService(data)
    res.status(200).json(updated);
  } catch (error) {
    next(error);
  }
}


exports.register = async (req, res, next) => {
  try {
     if (!req.body.firstname || !req.body.lastname || !req.body.contact || !req.body.position || !req.body.username || !req.body.password) {
     const err = new Error("suplied data fields are incomplete");
      err.status = 400;
      next( err);
    } 
    const { firstname, lastname, contact, position, username, password } = req.body; 
 const contactExist = await contactExistService(contact);
    if (contactExist) {
      const err = new Error("contact already exist");
      err.status = 400;
     return next(err);
    }
    const usernameExist = await usernameExistService(req.body.username);
    if (usernameExist) {
      const err = new Error("username already in use, choose another");
      err.status = 400;
    return  next(err); 
    }
     //hash the password
    const hashPassword = hashSync(password, 12);
    const newUser = {
      firstname,
      lastname,
      contact,
      role:position,
      username,
      password:hashPassword,
    } 
    const account = await createAccountService(newUser);
     if (account.error) {
     return res.status(400).json(account.error);
    } 
    res.status(201).json(account);
    
  } catch (error) { 
    next(error);
  }
};

exports.deleteAccountById = async (req, res, next) => {
  try {  
    const account = await deleteAccountByIdService(req.body)
    if (account.error) { 
    return res.status(401).json(account);
    }
    if (account.msg)
       return res.status(404).json(account);
    res.status(200).json( account);
  } catch (error) {
    next(error);
  }
} 
 
exports.accountError = (err, req, res, next) => {
  res.status(err.status || 500).json({ error: err.message || "Unknow account error" });
}
 
