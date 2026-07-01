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
} = require("../controllers/userController");

const router = express.Router();

router.post("/signup", signup);

router.post("/login", login);

router.post("/forgotPassword", forgotPassword);

router.patch("/resetPassword/:token", resetPassword);

router.patch("/updateMyPassword", protect, updatePassword);

router.patch("/updateMe", protect, updateMe);

router.use(protect);
router.use(restrictTo("admin"));

router.route("/").get(getAllUsers);

router.route("/:id").get(getUserByID).patch(updateUser).delete(deleteUser);

module.exports = router;
