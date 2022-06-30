const mongoose = require("mongoose");

const transactionSchema = mongoose.Schema(
  {
    balance: {
      type: Number,
      default: 0,
    },
    userId: {
      type: String,
      required: true,
    },
    userNID: {
      type: String,
      required: true,
    },
    acc: {
      type: String,
      required: true,
    },
    transactions: [
      {
        index: {
          type: Number,
          required: true,
        },
        timestamp: {
          type: String,
          required: true,
        },
        data: {
          type: Object,
          amount: {
            type: Number,
            required: true,
          },
          transactionType: {
            type: String,
            required: true,
          },
          depositorWithdrawer: {
            name: {
              type: String,
              lowercase: true,
            },
            NID: {
              type: String,
            },
            mobile: {
              type: String,
            },
          },
          otp: {
            type: String,
            required: true,
          },
          branch: {
            type: String,
            required: true,
          },
        },
        previousHash: {
          type: String,
          required: true,
        },
        hash: {
          type: String,
          required: true,
        },
      },
    ],
  },
  {
    collection: "transactions",
    timestamps: true,
  }
);

// module.exports = mongoose.model("Transaction", transactionSchema);
module.exports = transactionSchema;
