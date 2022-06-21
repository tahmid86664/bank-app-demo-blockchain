const User = require("../models/User");
const Transaction = require("../models/Transaction");
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
  try {
    const user = await User.create(req.body);
    const genesisBlock = new Block(
      1,
      Date.now(),
      "Genesis Block",
      "0".repeat(64)
    );
    const transaction = await Transaction.create({
      userId: user._id,
      userNID: user.NID,
      transactions: [genesisBlock],
    });

    res.status(201).json({
      msg: `Account of ${user.name} is created successfully `,
      user: user,
      transactions: transaction.transactions,
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
