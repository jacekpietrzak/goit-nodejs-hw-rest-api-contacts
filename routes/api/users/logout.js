const express = require("express");

const router = express.Router();

const { auth } = require("../../../auth/auth.js");
const { updateUser } = require("../../../controllers/users.js");

router.get("/", auth, async (req, res, next) => {
  try {
    console.log("req.user:", req.user);
    const { _id } = req.user;
    console.log("userid:", _id);
    const newData = { token: null };
    const udpatedUser = await updateUser(_id, newData);
    console.log("updated user:", udpatedUser);
    return res.status(204).json({
      message: "Logged out",
    });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
});

module.exports = router;
