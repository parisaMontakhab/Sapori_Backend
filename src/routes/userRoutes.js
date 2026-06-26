const express = require("express");
const { signup, login } = require("../controllers/authController");
const {
  getAllUsers,
  getUserByID,
  updateUser,
  deleteUser,
} = require("../controllers/userController");

const router = express.Router();

router.post("/signup", signup);

router.post("/login", login);

router.route("/").get(getAllUsers);

router.route("/:id").get(getUserByID).patch(updateUser).delete(deleteUser);

module.exports = router;
