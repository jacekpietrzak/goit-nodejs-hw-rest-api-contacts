const express = require("express");

const { createUser, getUserByEmail } = require("../../../controllers/users.js");

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

  const newUser = await getUserByEmail(email);

  if (newUser) {
    return res.status(409).json({
      status: "error",
      code: 409,
      message: "Email is already in use",
      data: "Conflict",
    });
  }
  try {
    const user = await createUser(email, password);
    return res.status(201).json({
      status: "Created",
      code: 201,
      message: "Registration successful",
      data: {
        user: {
          email: user.email,
          subscription: user.subscription,
        },
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
});

module.exports = router;
