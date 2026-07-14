const express = require("express");
const {
  signup,
  login,
  protect,
  restrictTo,
  forgotPassword,
  resetPassword,
  updatePassword,
} = require("../controllers/authController");
const {
  getAllUsers,
  getUserByID,
  updateUser,
  deleteUser,
  updateMe,
  deleteMe,
  getMe,
} = require("../controllers/userController");

const router = express.Router();

router.post("/signup", signup);

router.post("/login", login);

router.post("/forgotPassword", forgotPassword);

router.patch("/resetPassword/:token", resetPassword);

router.use(protect);

router.patch("/updateMyPassword", updatePassword);

router.get("/me", getMe, getUserByID);

router.patch("/updateMe", updateMe);

router.delete("/deleteMe", deleteMe);

router.use(restrictTo("admin"));

router.route("/").get(getAllUsers);

router.route("/:id").get(getUserByID).patch(updateUser).delete(deleteUser);

module.exports = router;
