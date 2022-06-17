const express = require("express");
const app = express();
const userRoutes = require("./routes/userRoutes");
const transactionRoutes = require("./routes/transactionRoutes");

const port = process.env.PORT || 3000;

app.use(express.json());
app.use("/users", userRoutes);
app.use("/transactions", transactionRoutes);

app.listen(port, () => {
  console.log(`Server is up and running at port ${port}`);
});
