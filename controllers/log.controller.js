const UserLog = require("../models/log.model");



exports.userLog = async (userid,description) => {
  await UserLog.create({
    userid: userid,
    description: description,
    Date: new Date().toISOString(),
  });
}