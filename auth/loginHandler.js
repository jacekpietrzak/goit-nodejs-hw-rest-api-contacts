const bcrypt = require("bcrypt");
const { getUserByEmail } = require("../controllers/users.js");
const { issueToken } = require("../auth/issueToken.js");

const loginHandler = async (email, incomingPassword) => {
  const user = await getUserByEmail(email);

  if (!user) {
  }
};
