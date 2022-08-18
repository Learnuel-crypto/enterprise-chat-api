const { getUsersService,searchUsersService } = require("../services/user.services");

exports.getUsers = async(req, res, next)=> {
  try {
    const users = await getUsersService();
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

exports.searchUsers = async(req, res, next)=> {
  try {
    if (req.query.search) {
      const err = new Error("Search is required");
      err.status = 400;
      return next(err);
    }
    const users = await searchUsersService();
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
}