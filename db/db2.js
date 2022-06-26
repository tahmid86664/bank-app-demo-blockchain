const mongoose = require("mongoose");
const userSchema = require("../models/User");
const transactionSchema = require("../models/Transaction");

const test2 = mongoose.connection.useDb("test2");

const User2 = test2.model("User2", userSchema);
const Transaction2 = test2.model("Transaction2", transactionSchema);

module.exports = {
  User2,
  Transaction2,
};
