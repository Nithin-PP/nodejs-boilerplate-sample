const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    roles: [String],
  },
  { autoCreate: false, autoIndex: false }
);
const User = mongoose.model("User", userSchema);
module.exports = User;
