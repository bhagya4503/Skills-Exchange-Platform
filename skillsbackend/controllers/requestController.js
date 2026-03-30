const Request = require("../models/Request");

// ✅ Send Request
exports.sendRequest = async (req, res) => {
    try {
        const { toUserId } = req.body;

        const existing = await Request.findOne({
            $or: [
                { fromUser: req.user._id, toUser: toUserId },
                { fromUser: toUserId, toUser: req.user._id },
            ],
        });

        if (existing) {
            return res.status(400).json({ message: "Request already exists between users" });
        }

        if (existing) {
            return res.status(400).json({ message: "Request already sent" });
        }
        if (toUserId === req.user._id.toString()) {
            return res.status(400).json({ message: "You cannot send request to yourself" });
        }
        const request = await Request.create({
            fromUser: req.user._id,
            toUser: toUserId,
        });

        res.status(201).json(request);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// ✅ Get Received Requests
exports.getReceivedRequests = async (req, res) => {
    const requests = await Request.find({ toUser: req.user._id })
        .populate("fromUser", "name email skillsHave");

    res.json(requests);
};

// ✅ Respond to Request
exports.respondRequest = async (req, res) => {
    const { requestId, action } = req.body;

    const request = await Request.findById(requestId);

    if (!request) {
        return res.status(404).json({ message: "Request not found" });
    }

    if (request.toUser.toString() !== req.user._id.toString()) {
        return res.status(401).json({ message: "Not authorized" });
    }

    request.status = action; // accepted or rejected
    await request.save();

    res.json(request);
};

exports.getSentRequests = async (req, res) => {
    const requests = await Request.find({ fromUser: req.user._id })
        .populate("toUser", "name email skillsHave");

    res.json(requests);
};