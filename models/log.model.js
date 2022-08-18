const { Schema,model } = require("mongoose");

const UserLogSchema = new Schema({
  userid: {
    type: Schema.Types.ObjectId,
    ref: "account",
    required: true
  },
  description: {
    type: String, required: true
  }
}, { timestamps: true });

const UserLogModel = model("userlog", UserLogSchema);
module.exports = UserLogModel;
