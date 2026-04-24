const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const { getMatches, getUserById } = require("../controllers/userController");
const {
    getUserProfile,
    updateUserProfile,
} = require("../controllers/userController");

// protected routes
router.get("/me", protect, getUserProfile);
router.put("/update", protect, updateUserProfile);
router.get("/match", protect, getMatches);
router.get("/:id", protect, getUserById);
module.exports = router;