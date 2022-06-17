const getAllUsers = (req, res) => {
  res.status(200).send("all users found");
};

const getUser = (req, res) => {
  res.status(200).send(`user of id ${req.params.id}`);
};

const createAccounts = (req, res) => {
  const user = req.body;
  res.status(201).json({
    msg: `Account of ${user.name} is created successfully `,
    user: user,
  });
};

module.exports = {
  getAllUsers,
  getUser,
  createAccounts,
};
