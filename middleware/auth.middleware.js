 
const { verify } = require("jsonwebtoken");  
const { isLoggedIn } = require("../controllers/auth.controller");
exports.userRequired = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) {
      const err = new Error("Authentication required");
      err.status = 401;
      return next(err);
    } 
    //get the taken from the string
    const token = authorization.split(" ")[1];
    //decode the 
    const payload = verify(token, process.env.JWT_SECRET_TOKEN); 
    req.body.role = payload.role;
    req.body.id = payload.id;
    const checkUserLog = await isLoggedIn(req,res,next);
    if (!checkUserLog) {
      const err = new Error("Account is logged out, login again");
      err.status = 401;
    return  next(err);
    }
    next();//call the next middleware
  } catch (error) { 
    let err = error;
    if (err.name === "TokenExpiredError") {
      err.message = "Token expired";
      err.status = 400;
   }
    next(err);
  }
};

exports.adminRequired = async (req, res, next) => {
   try {
    const { authorization } = req.headers;
    if (!authorization) {
      const err = new Error("Authentication required");
      err.status = 401;
      return next(err);
    } 
    const token = authorization.split(" ")[1]; 
    const payload = verify(token, process.env.JWT_SECRET_TOKEN);
     const role = payload.role.toLowerCase();
     if (role !== "administrator" && role !== "manager" && role !== "ceo" && role !== "secretary") {
       const err = new Error("Access denied");
       err.status = 403;
       return next(err);
     }
    req.body.role = payload.role;
    req.body.id = payload.id;
    next(); 
  } catch (error) { 
    next(error);
  }
}