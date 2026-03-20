const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");
const verifyToken = require("../middlewares/auth.middleware");

router.post("/login", authController.login);
router.post("/register", authController.register);
router.get("/users", authController.getUsers);
router.get("/users/:id", verifyToken, authController.getUserById);
router.patch("/users/:id", authController.updateUser);
router.delete("/users/:id", authController.deleteUser);

module.exports = router;