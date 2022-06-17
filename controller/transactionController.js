const getAllTransactions = (req, res) => {
  res.status(200).send("all transactions");
};

const createTransaction = (req, res) => {
  const transaction = req.body;
  res.status(201).json({
    msg: `Transaction is created of id ${transaction.id}`,
    transaction,
  });
};

module.exports = {
  getAllTransactions,
  createTransaction,
};
