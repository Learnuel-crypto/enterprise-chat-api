const { Schema, model } = require("mongoose");

const UserStatusSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "account",
    required: true
  },
  status:{type: Boolean, default:true},
},{timestamps:true});

const UserLogStatus = model("userstatu", UserStatusSchema);

module.exports = UserLogStatus;