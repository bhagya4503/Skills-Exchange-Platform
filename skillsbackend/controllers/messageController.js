const Message = require("../models/Message");

// save message
exports.sendMessage = async (req, res) => {
    try {
        const { receiverId, message } = req.body;

        const newMessage = await Message.create({
            sender: req.user._id,
            receiver: receiverId,
            message,
        });

        res.status(201).json(newMessage);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// get chat history
exports.getMessages = async (req, res) => {
    try {
        const { userId } = req.params;

        const messages = await Message.find({
            $or: [
                { sender: req.user._id, receiver: userId },
                { sender: userId, receiver: req.user._id },
            ],
        }).sort({ createdAt: 1 });

        res.json(messages);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};