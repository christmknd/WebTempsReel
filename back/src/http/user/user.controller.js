const userService = require("./user.service.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

async function login(req, res) {
  try {
    const { username, password } = req.body;
    if (!password || !username) {
      return res
        .status(400)
        .json({ message: "Username and password are required" });
    }
    const user = await userService.findByUsername(username);
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ message: "Invalid password" });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    return res.status(200).json({ token: token, user_id: user.id });
  } catch (err) {
    res.status(500).json({ message: err });
  }
}

async function signup(req, res) {
  try {
    const { username, password, firstname, lastname, role } = req.body;
    if (!password || !username) {
      return res
        .status(400)
        .json({ message: "Username and password are required" });
    }
    const userExists = await userService.findByUsername(username);
    if (userExists) {
      console.log("user exists", userExists);
      return res.status(400).json({ message: "Username already exists" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    console.log("hashed password", hashedPassword);
    const savedUser = await userService.create({
      username,
      password,
      firstname,
      lastname,
      password: hashedPassword,
      role,
    });
    const token = jwt.sign({ id: savedUser.id }, process.env.JWT_SECRET);
    return res
      .status(200)
      .json({ message: "User created successfully", savedUser, token });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message_brr: err });
  }
}

// async function signup(req, res) {
//   // try {
//   const { username, password, firstname, lastname, role } = req.body;
//   // return all users
//   const users = await userService.findAll();
//   return res.status(200).json({ users });
//   // } catch (err) {
//   //   console.log(err);
//   //   res.status(500).json({ message_brr: err });
//   // }
// }

function addUser(req, res) {
  let user = req.body;
  console.log("addUser");
  userService
    .create(user)
    .then((data) => {
      res.send(data);
    })
    .catch((error) => {
      console.log(error);
    });
}

function findUserById(req, res) {
  console.log("findUserById");
  userService
    .findById(req.params.id)
    .then((data) => {
      res.send(data);
    })
    .catch((error) => {
      console.log(error);
    });
}

function deleteById(req, res) {
  console.log("deleteById");
  userService
    .deleteById(req.params.id)
    .then((data) => {
      res.status(200).json({
        message: "User deleted successfully",
        user: data,
      });
    })
    .catch((error) => {
      console.log(error);
    });
}

function updateUser(req, res) {
  console.log("updateUser");
  userService
    .updateUser(req.body, req.params.id)
    .then((data) => {
      res.status(200).json({
        message: "User updated successfully",
        user: data,
      });
    })
    .catch((error) => {
      console.log(error);
    });
}

function findUsers(req, res) {
  console.log("findUsers");
  userService
    .findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((error) => {
      console.log(error);
    });
}

const userController = {
  addUser,
  findUsers,
  findUserById,
  updateUser,
  deleteById,
  login,
  signup,
};

module.exports = userController;
