const express = require("express");
const router = express.Router();
const {
  getAllTransactions,
  getTransactionInfoById,
  getAllTransactionsOfOneUser,
  createTransaction,
} = require("../controllers/transactionController");

router.route("/").get(getAllTransactions).post(createTransaction);
router.route("/:userId").get(getTransactionInfoById);
router.route("/:userId/transactions").get(getAllTransactionsOfOneUser);

module.exports = router;
