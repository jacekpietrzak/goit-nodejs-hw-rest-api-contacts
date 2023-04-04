const express = require("express");

const router = express.Router();
const { auth } = require("../../../auth/auth.js");
const { getUserById } = require("../../../controllers/users.js");

router.get("/", auth, async (req, res, next) => {
  try {
    const user = await getUserById(req.user.id);

    return res.status(200).json({
      status: "success",
      code: 200,
      data: {
        user: {
          email: user.email,
          subscription: user.subscription,
        },
      },
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
});

module.exports = router;
