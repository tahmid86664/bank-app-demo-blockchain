const { Transaction } = require("../db/db1");
const { Transaction2 } = require("../db/db2");
const { Transaction3 } = require("../db/db3");

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
      $or: [{ acc: t.acc }, { userNID: t.userNID }],
    });
    const lastTransaction =
      transaction.transactions[transaction.transactions.length - 1];

    const index = lastTransaction.index + 1;
    const data = { amount: t.amount, transactionType: t.transactionType };
    const prevHash = lastTransaction.hash;
    const timestamp = Date.now();

    await Transaction.findOneAndUpdate({
      acc: transaction.acc,
    }).exec(async (err, doc) => {
      if (err) {
        console.log(err);
        return;
      } else {
        const { docum, dataset } = transactionAddingFunction(doc, data);
        // console.log({ docum, dataset });
        const newBlock = new Block(index, timestamp, dataset, prevHash);
        docum.transactions.push(newBlock);
        await docum.save();
      }
    });

    // branch 2
    await Transaction2.findOneAndUpdate({
      acc: transaction.acc,
    }).exec(async (err, doc) => {
      if (err) {
        console.log(err);
        return;
      } else {
        const { docum, dataset } = transactionAddingFunction(doc, data);
        // console.log({ docum, dataset });
        const newBlock = new Block(index, timestamp, dataset, prevHash);
        docum.transactions.push(newBlock);
        await docum.save();
      }
    });

    // branch 3
    await Transaction3.findOneAndUpdate({
      acc: transaction.acc,
    }).exec(async (err, doc) => {
      if (err) {
        console.log(err);
        return;
      } else {
        const { docum, dataset } = transactionAddingFunction(doc, data);
        // console.log({ docum, dataset });
        const newBlock = new Block(index, timestamp, dataset, prevHash);
        docum.transactions.push(newBlock);
        const result = await docum.save();
        res.status(201).send(result.transactions);
      }
    });
  } catch (err) {
    res.status(500).send(err);
  }
};

const transactionAddingFunction = (doc, data) => {
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

  const docum = doc;
  const dataset = data;

  return { docum, dataset };
};

module.exports = {
  getAllTransactions,
  getTransactionInfoById,
  getAllTransactionsOfOneUser,
  createTransaction,
};
