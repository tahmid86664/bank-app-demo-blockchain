const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      lowercase: true,
      required: true,
    },
    lastName: {
      type: String,
      lowercase: true,
      required: true,
    },
    NID: {
      type: String,
      required: true,
      unique: true,
    },
    acc: {
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
      lowercase: true,
      max: 100,
    },
    permanentAddress: {
      type: String,
      lowercase: true,
      max: 100,
    },
    nomini: {
      type: Object,
      required: true,
      firstName: {
        type: String,
        lowercase: true,
        required: true,
      },
      lastName: {
        type: String,
        lowercase: true,
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
        lowercase: true,
        required: true,
      },
    },
  },
  {
    collection: "users",
    timestamps: true,
  }
);

// const test = mongoose.connection.useDb("test");

// module.exports = test.model("User", userSchema);
module.exports = userSchema;
