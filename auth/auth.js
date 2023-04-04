const jwt = require("jsonwebtoken");

const { getUserById } = require("../controllers/users.js");

const jwtSecret = process.env.JWT_SECRET;

const auth = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({
      status: "error",
      code: 401,
      message: "No token provided",
      data: "Unauthorized",
    });
  }
  try {
    const decodedToken = jwt.verify(token, jwtSecret);
    const { id } = decodedToken;

    const user = await getUserById(id);
    const userToken = user.token;

    if (!user) {
      return res.status(401).json({
        status: "error",
        code: 401,
        message: "Not authorized",
        data: "Unauthorized",
      });
    }
    if (token !== userToken) {
      return res.status(401).json({
        status: "error",
        code: 401,
        message: "Not authorized",
        data: "Unauthorized",
      });
    }

    req.user = user;

    // console.log("user from auth:", user);
    // console.log("decodedToken from auth:", decodedToken);

    next();
  } catch (error) {
    return res.status(401).json({
      status: "error",
      code: 401,
      message: "Not authorized",
      data: "Unauthorized",
    });
  }
};

module.exports = { auth };
