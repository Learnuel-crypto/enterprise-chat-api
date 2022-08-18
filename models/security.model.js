const { Schema, model } = require("mongoose");

const SecuritySchema = new Schema({
  userid: {
    type: Schema.Types.ObjectId,
  ref:"account",  required: true
  },
  question1: { type: String, required: true },
  answer1: { type: String, required: true },
  question2: { type: String, required: true },
  answer2: { type: String, required: true },
}, { timeseries: true });

const SecurityQuestion = model("securityquestion", SecuritySchema);

module.exports = SecurityQuestion;