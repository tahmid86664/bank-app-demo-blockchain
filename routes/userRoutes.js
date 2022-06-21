const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  getUser,
  createAccounts,
} = require("../controllers/userController");

router.route("/").get(getAllUsers).post(createAccounts);
router.route("/:id").get(getUser);

module.exports = router;
