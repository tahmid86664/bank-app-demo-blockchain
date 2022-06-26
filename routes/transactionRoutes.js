const express = require("express");
const router = express.Router();
const {
  getAllTransactions,
  getTransactionInfoById,
  getAllTransactionsOfOneUser,
  createTransaction,
  getUserByAcc,
  getAccountBalace,
} = require("../controllers/transactionController");

router.route("/").get(getAllTransactions).post(createTransaction);
router.route("/:userId").get(getTransactionInfoById);
router.route("/:userId/transactions").get(getAllTransactionsOfOneUser);
router.route("/:branch/:acc").get(getUserByAcc);
router.route("/:branch/:acc/balance").get(getAccountBalace);
module.exports = router;
