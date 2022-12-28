const jwt = require("jsonwebtoken");
const userService = require("../http/user/user.service");

const getUser = async (token) => {
  try {
    console.log("secret", process.env.JWT_SECRET);
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userService.findById(decoded.id);
    console.log("user from isAuthenticated", user);
    console.log("user authenticated");
    return decoded;
    return user;
  } catch (err) {
    console.log("err", err);
    console.log("user not authenticated");
    return null;
  }
};

module.exports = getUser;
