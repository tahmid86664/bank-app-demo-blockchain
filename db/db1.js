const mongoose = require("mongoose");
const userSchema = require("../models/User");
const transactionSchema = require("../models/Transaction");

const test = mongoose.connection.useDb("test");

const User = test.model("User", userSchema);
const Transaction = test.model("Transaction", transactionSchema);

module.exports = {
  User,
  Transaction,
};
