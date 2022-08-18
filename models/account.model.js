const { Schema, model } = require("mongoose");

const AccountSchema = new Schema({
  firstname: {
    type: String, reguired: true
  },
  lastname: {
    type: String, reguired: true
  },
  contact: {
    type: String, required: true, unique: true
  },
  role: {
    type: String, required: true,
     enum: ["Administrator", "CEO", "Manager", "Operator", "Secretary", "Designer"]
  },
  username: {
    type: String, required: true, unique: true
  },
  password: {
    type: String, required: true
  },
refreshToken:{type:String, default:"none"}
}, { timestamps: true });

const AccountModel = model("account", AccountSchema);


module.exports = AccountModel;