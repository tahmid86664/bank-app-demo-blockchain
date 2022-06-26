const mongoose = require("mongoose");
const userSchema = require("../models/User");
const transactionSchema = require("../models/Transaction");

const test3 = mongoose.connection.useDb("test3");

const User3 = test3.model("User3", userSchema);
const Transaction3 = test3.model("Transaction3", transactionSchema);

module.exports = {
  User3,
  Transaction3,
};
