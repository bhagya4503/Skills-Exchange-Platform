const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const { getSentRequests } = require("../controllers/requestController");

const {
    sendRequest,
    getReceivedRequests,
    respondRequest,
} = require("../controllers/requestController");

router.post("/send", protect, sendRequest);
router.get("/received", protect, getReceivedRequests);
router.put("/respond", protect, respondRequest);
router.get("/sent", protect, getSentRequests);

module.exports = router;