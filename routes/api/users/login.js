const express = require("express");
const bcrypt = require("bcrypt");

const { getUserByEmail, updateUser } = require("../../../controllers/users.js");
const { issueToken } = require("../../../auth/issueToken.js");
const { userValidationSchema } = require("../../../models/user.js");

const router = express.Router();

router.post("/", async (req, res) => {
  const { email, password } = req.body;
  const { error } = userValidationSchema.validate(req.body);

  if (error) {
    return res.status(400).json({
      status: "error",
      code: 400,
      message: error.details[0].message,
      data: "Bad Request",
    });
  }

  const user = await getUserByEmail(email);
  const userPassword = user.password;

  const passwordCorrect = bcrypt.compareSync(password, userPassword);

  if (!user || !passwordCorrect) {
    return res.status(400).json({
      status: "error",
      code: 400,
      message: "Email or password is wrong",
      data: "Bad request",
    });
  }

  try {
    const token = issueToken(user);

    const newData = { token: token };
    await updateUser(user._id, newData);

    return res.status(200).json({
      status: "success",
      code: 200,
      data: {
        token,
        user: {
          email: user.email,
          subscription: user.subscription,
        },
      },
    });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
});

module.exports = router;
