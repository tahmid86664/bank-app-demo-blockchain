const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    NID: {
      type: String,
      required: true,
      unique: true,
    },
    mobile: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 6,
    },
    picture: {
      type: String,
      default: "",
    },
    presentAddress: {
      type: String,
      max: 100,
    },
    permanentAddress: {
      type: String,
      max: 100,
    },
    nomini: {
      type: Object,
      required: true,
      firstName: {
        type: String,
        required: true,
      },
      lastName: {
        type: String,
        required: true,
      },
      NID: {
        type: String,
        required: true,
      },
      mobile: {
        type: String,
        required: true,
      },
      picture: {
        type: String,
        default: "",
      },
      relationship: {
        type: String,
        required: true,
      },
    },
  },
  {
    collection: "users",
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
