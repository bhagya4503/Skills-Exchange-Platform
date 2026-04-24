const User = require("../models/User");
const jwt = require("jsonwebtoken");
const Request = require("../models/Request");

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: "7d",
    });
};
// ✅ Get Logged-in User Profile
exports.getUserProfile = async (req, res) => {
    res.json(req.user);
};

// ✅ Update Profile

exports.updateUserProfile = async (req, res) => {
    try {
        console.log("REQ BODY:", req.body); // ✅ log incoming data

        const user = await User.findById(req.user._id);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (req.body.skillsHave) user.skillsHave = req.body.skillsHave;
        if (req.body.skillsWant) user.skillsWant = req.body.skillsWant;
        if (req.body.bio !== undefined) user.bio = req.body.bio;
        if (req.body.availability) user.availability = req.body.availability;
        if (req.body.avatar) user.avatar = req.body.avatar;

        const updatedUser = await user.save();

        console.log("UPDATED:", updatedUser); // ✅ log result

        res.json(updatedUser);

    } catch (error) {
        console.error("🔥 FULL ERROR:", error); // ✅ VERY IMPORTANT
        res.status(500).json({ message: error.message });
    }
};
//Match Controller

// exports.getMatches = async (req, res) => {
//     try {
//         const currentUser = await User.findById(req.user._id);

//         // 🔥 Get all requests where current user involved
//         const requests = await Request.find({
//             $or: [
//                 { fromUser: req.user._id },
//                 { toUser: req.user._id },
//             ],
//         });

//         // 🔥 Extract user IDs already connected or requested
//         const excludedUserIds = requests.map((req) =>
//             req.fromUser.toString() === req.user._id.toString()
//                 ? req.toUser
//                 : req.fromUser
//         );

//         const matches = await User.find({
//             _id: {
//                 $ne: currentUser._id,
//                 $nin: excludedUserIds, // ❌ exclude these users
//             },
//             $or: [
//                 { skillsHave: { $in: currentUser.skillsWant } },
//                 { skillsWant: { $in: currentUser.skillsHave } },
//             ],
//         }).select("-password");

//         res.json(matches);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };

exports.getMatches = async (req, res) => {
    try {
        const currentUser = await User.findById(req.user._id);

        const requests = await Request.find({
            $or: [
                { fromUser: req.user._id },
                { toUser: req.user._id },
            ],
        });

        // ✅ FIXED HERE
        const excludedUserIds = requests.map((r) =>
            r.fromUser.toString() === req.user._id.toString()
                ? r.toUser
                : r.fromUser
        );

        const matches = await User.find({
            _id: {
                $ne: currentUser._id,
                $nin: excludedUserIds,
            },
            $or: [
                { skillsHave: { $in: currentUser.skillsWant } },
                { skillsWant: { $in: currentUser.skillsHave } },
            ],
        }).select("-password");

        res.json(matches);
    } catch (error) {
        console.error("MATCH ERROR:", error); // 👈 IMPORTANT
        res.status(500).json({ message: error.message });
    }
};

exports.getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select("-password");

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};