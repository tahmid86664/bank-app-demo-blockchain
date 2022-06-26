// const User = require("../db/db1");
// const Transaction = require("../models/Transaction");
const { User, Transaction } = require("../db/db1");
const { User2, Transaction2 } = require("../db/db2");
const { User3, Transaction3 } = require("../db/db3");

const Block = require("../blockchain/Block");

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).send(users);
  } catch (err) {
    res.status(500).send(err);
  }
};

const getUser = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id });
    res.status(200).send(user);
  } catch (err) {
    res.status(500).send(err);
  }
};

const createAccounts = async (req, res) => {
  const u = req.body;
  u.acc = u.firstName[0].toUpperCase() + u.NID + u.mobile.slice(-4);

  try {
    const user = await User.create(u);
    const genesisBlock = new Block(
      1,
      Date.now(),
      "Genesis Block",
      "0".repeat(64)
    );
    const transaction = await Transaction.create({
      userId: user._id,
      userNID: user.NID,
      acc: user.acc,
      transactions: [genesisBlock],
    });

    // for second branch
    const user2 = await User2.create(u);
    const transaction2 = await Transaction2.create({
      userId: user2._id,
      userNID: user.NID,
      acc: user.acc,
      transactions: [genesisBlock],
    });

    // for third branch
    const user3 = await User3.create(u);
    const transaction3 = await Transaction3.create({
      userId: user3._id,
      userNID: user.NID,
      acc: user.acc,
      transactions: [genesisBlock],
    });

    res.status(201).json({
      msg: `Account of ${user.name} is created successfully `,
      user: user3,
      transactions: transaction3.transactions,
    });
  } catch (err) {
    res.status(201).send(err);
  }
};

module.exports = {
  getAllUsers,
  getUser,
  createAccounts,
};
