const { Transaction } = require("../db/db1");
const { Transaction2 } = require("../db/db2");
const { Transaction3 } = require("../db/db3");

const Block = require("../blockchain/Block");

const getUserByAcc = async (req, res) => {
  const branch = req.params.branch;
  const acc = req.params.acc;
  try {
    if (branch === "1") {
      const transactions = await Transaction.findOne({ acc: acc });
      res
        .status(200)
        .json({ msg: `from branch ${branch}`, data: transactions });
    } else if (branch === "2") {
      const transactions2 = await Transaction2.findOne({ acc: acc });
      res
        .status(200)
        .json({ msg: `from branch ${branch}`, data: transactions2 });
    } else if (branch === "3") {
      const transactions3 = await Transaction3.findOne({ acc: acc });
      res
        .status(200)
        .json({ msg: `from branch ${branch}`, data: transactions3 });
    } else {
      return;
    }
  } catch (err) {
    res.status(500).send(err);
  }
};

const getAccountBalace = async (req, res) => {
  const branch = req.params.branch;
  const acc = req.params.acc;

  try {
    if (branch === "1") {
      const transactions = await Transaction.findOne({ acc: acc });
      res
        .status(200)
        .json({ msg: `from branch ${branch}`, data: transactions.balance });
    } else if (branch === "2") {
      const transactions2 = await Transaction2.findOne({ acc: acc });
      res
        .status(200)
        .json({ msg: `from branch ${branch}`, data: transactions2.balance });
    } else if (branch === "3") {
      const transactions3 = await Transaction3.findOne({ acc: acc });
      res
        .status(200)
        .json({ msg: `from branch ${branch}`, data: transactions3.balance });
    } else {
      return;
    }
  } catch (err) {
    res.status(500).send(err);
  }
};

const getLastTransaction = async (req, res) => {
  try {
    const t = req.body;
    // console.log(t);
    const transaction = await Transaction.findOne({
      $or: [{ acc: t.acc }, { userNID: t.userNID }],
    });
    const lastTransaction =
      transaction.transactions[transaction.transactions.length - 1];

    const index = lastTransaction.index;
    const prevHash = lastTransaction.hash;
    console.log(t);
    res.status(200).json({ index, prevHash });
  } catch (err) {
    res.status(500).send(err);
  }
};

const createTransactionByBranch = async (req, res) => {
  try {
    const t = req.body;
    const branch = req.params.branch;
    console.log(`creating from branch ${branch}`);

    // ekhane transaction gulo find out kora individual howa laagbe
    // apadoto rakha r ki
    // const transaction = await Transaction.findOne({
    //   $or: [{ acc: t.acc }, { userNID: t.userNID }],
    // });
    // const lastTransaction =
    //   transaction.transactions[transaction.transactions.length - 1];

    // const index = lastTransaction.index + 1;
    const index = +t.index;

    const data = {
      amount: +t.amount, // + sign is for converting into number
      transactionType: t.transactionType,
      otp: t.otp,
      branch: t.branch,
    };
    if (t.transactionType === "cwo") {
      data["otherName"] = t.name;
      data["otherNID"] = t.withdrawerNid;
      data["otherMobile"] = t.mobile;
    }
    const prevHash = t.prevHash;
    const timestamp = t.timestamp;

    if (branch === "1") {
      await Transaction.findOne({
        acc: t.acc,
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
          const result = await docum.save();
          res.status(201).send(result.transactions);
        }
      });
    } else if (branch === "2") {
      await Transaction2.findOne({
        acc: t.acc,
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
    } else if (branch === "3") {
      await Transaction3.findOne({
        acc: t.acc,
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
    }
  } catch (err) {}
};

////
////
////
////

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
      name: data.otherName,
      NID: data.otherNID,
      mobile: data.otherMobile,
    };
  } else if (data.transactionType === "cwo") {
    // cwo -> cash withdraw by others
    doc.balance = doc.balance - data.amount;
    data.depositorWithdrawer = {
      name: data.otherName,
      NID: data.otherNID,
      mobile: data.otherMobile,
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
  //
  //
  //
  getUserByAcc,
  getAccountBalace,
  createTransactionByBranch,
  getLastTransaction,
};
