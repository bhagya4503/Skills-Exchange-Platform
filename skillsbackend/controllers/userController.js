const User = require("../models/User");
const jwt = require("jsonwebtoken");
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

// exports.updateUserProfile = async (req, res) => {
//     try {
//         const user = await User.findById(req.user._id);

//         if (!user) {
//             return res.status(404).json({ message: "User not found" });
//         }

//         // ✅ overwrite properly (NOT merge confusion)
//         // user.skillsHave = req.body.skillsHave || [];
//         // user.skillsWant = req.body.skillsWant || [];
//         // user.bio = req.body.bio || "";
//         // user.availability = req.body.availability || "";
//         // user.avatar = req.body.avatar || "";
//         if (req.body.skillsHave) user.skillsHave = req.body.skillsHave;
//         if (req.body.skillsWant) user.skillsWant = req.body.skillsWant;
//         if (req.body.bio !== undefined) user.bio = req.body.bio;
//         if (req.body.availability) user.availability = req.body.availability;
//         if (req.body.avatar) user.avatar = req.body.avatar;


//         const updatedUser = await user.save();

//         res.json({
//             _id: updatedUser._id,
//             name: updatedUser.name,
//             email: updatedUser.email,
//             skillsHave: updatedUser.skillsHave,
//             skillsWant: updatedUser.skillsWant,
//             bio: updatedUser.bio,
//             availability: updatedUser.availability,
//             avatar: updatedUser.avatar,
//             token: generateToken(updatedUser._id),
//         });

//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };


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

exports.getMatches = async (req, res) => {
    try {
        const currentUser = await User.findById(req.user._id);

        const matches = await User.find({
            _id: { $ne: currentUser._id },

            $or: [
                { skillsHave: { $in: currentUser.skillsWant } },
                { skillsWant: { $in: currentUser.skillsHave } },
            ],
        }).select("-password");

        res.json(matches);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
    console.log("Current User:", currentUser);
};