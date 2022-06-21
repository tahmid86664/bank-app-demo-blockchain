const Transaction = require("../models/Transaction");
const Block = require("../blockchain/Block");

const getAllTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find();
    res.status(200).send(transactions);
  } catch (err) {
    res.status(500).send(err);
  }
};

const getTransactionInfoById = async (req, res) => {
  try {
    const transactions = await Transaction.find({ userId: req.params.userId });
    res.status(200).send(transactions);
  } catch (err) {
    res.status(500).send(err);
  }
};

const getAllTransactionsOfOneUser = async (req, res) => {
  try {
    const transaction = await Transaction.findOne({
      userId: req.params.userId,
    });
    res.status(200).send(transaction.transactions);
  } catch (err) {
    res.status(500).send(err);
  }
};

const createTransaction = async (req, res) => {
  try {
    const t = req.body;
    const transaction = await Transaction.findOne({
      $or: [{ userId: t.userId }, { userNID: t.userNID }],
    });
    const lastTransaction =
      transaction.transactions[transaction.transactions.length - 1];

    const index = lastTransaction.index + 1;
    const data = { amount: t.amount, transactionType: t.transactionType };
    const prevHash = lastTransaction.hash;

    await Transaction.findOneAndUpdate({
      userId: transaction.userId,
    }).exec(async (err, doc) => {
      if (err) {
        console.log(err);
        return;
      } else {
        if (data.transactionType === "cd") {
          doc.balance = doc.balance + data.amount;
        } else if (data.transactionType === "cw") {
          doc.balance = doc.balance - data.amount;
        } else if (data.transactionType === "cdo") {
          // cdo -> cash deposit by others
          doc.balance = doc.balance + data.amount;
          data.depositorWithdrawer = {
            name: t.otherName,
            NID: t.otherNID,
            mobile: t.otherMobile,
          };
        } else if (data.transactionType === "cwo") {
          // cwo -> cash withdraw by others
          doc.balance = doc.balance - data.amount;
          data.depositorWithdrawer = {
            name: t.otherName,
            NID: t.otherNID,
            mobile: t.otherMobile,
          };
        }

        const newBlock = new Block(index, Date.now(), data, prevHash);
        doc.transactions.push(newBlock);
        const result = await doc.save();
        res.status(201).send(result.transactions);
      }
    });
  } catch (err) {
    res.status(500).send(err);
  }
};

module.exports = {
  getAllTransactions,
  getTransactionInfoById,
  getAllTransactionsOfOneUser,
  createTransaction,
};
