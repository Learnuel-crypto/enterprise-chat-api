const { Schema, model } = require("mongoose");

const AccountRole = new Schema({
  role: {
    type: Array,
    default: ["Administrator", "CEO", "Manager", "Operator", "Secretary", "Designer"]
  },
}, { timeseries: true });

const UserRole = model("AccountRole", AccountRole);

module.exports = UserRole;