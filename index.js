const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");

const connectDB = require("./db/connect");

const userRoutes = require("./routes/userRoutes");
const transactionRoutes = require("./routes/transactionRoutes");

const port = process.env.PORT || 9000;

app.use(
  cors({
    origin: ["http://localhost:3000"],
  })
);
app.use(express.json());
app.use("/users", userRoutes);
app.use("/transactions", transactionRoutes);

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`Server is up and running on port ${port}`);
    });
  } catch (err) {
    console.log(err);
  }
};

start();
