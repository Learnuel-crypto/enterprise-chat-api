const { resetLogin } = require("../services/login.services");
const { userLog } = require("../controllers/log.controller");
 

exports.resetLogin = async (req, res, next) => {
  try { 
    if (!req.body.id) {
      const err = new Error("Account Id is required");
      err.statu = 400;
     return next(err);
    }
    if (!req.body.username && !req.body.password) {
     const err = new Error("username or and password is required");
      err.statu = 400;
     return next(err);
    }
    if (req.body.password && req.body.password.length < 8) {
      const err = new Error("password is too short");
      err.statu = 400;
     return next(err);
    }
    const data = {};
    for (key in req.body) {
      if(key ==="username" || key ==="password")
        data[key] = req.body[key];
    } 
    const reset = await resetLogin(req.body.id, data);
    if (reset.success)
      await userLog(reset.user._id, "reset login details");
    res.status(201).json(reset);
  } catch (error) {
    next(error);
  }
}