const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const requestRoutes = require("./routes/requestRoutes");
const messageRoutes = require("./routes/messageRoutes");
dotenv.config(); // load env

connectDB(); // connect database

const app = express();

// middleware
app.use(cors());
// app.use(express.json());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));


//routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/requests", requestRoutes);

app.use("/api/messages", messageRoutes);
// test route
app.get("/", (req, res) => {
    res.send("API is running...🛜");
});

// const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT} 🚀`);
// });

const http = require("http");
const { Server } = require("socket.io");

const server = http.createServer(app);

// socket setup
const io = new Server(server, {
    cors: {
        origin: "*",
    },
});

// store online users
let onlineUsers = {};

// io.on("connection", (socket) => {
//     console.log("User connected:", socket.id);

//     // user joins with their ID
//     socket.on("join", (userId) => {
//         onlineUsers[userId] = socket.id;
//         console.log("Online Users:", onlineUsers);
//     });

//     // send message
//     socket.on("sendMessage", ({ senderId, receiverId, message }) => {
//         const receiverSocket = onlineUsers[receiverId];

//         if (receiverSocket) {
//             io.to(receiverSocket).emit("receiveMessage", {
//                 senderId,
//                 message,
//             });
//         }
//     });

//     socket.on("disconnect", () => {
//         console.log("User disconnected");
//     });
// });

io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    // ✅ JOIN
    socket.on("join", (userId) => {
        onlineUsers[userId] = socket.id;

        // 🔥 send online users to everyone
        io.emit("onlineUsers", Object.keys(onlineUsers));

        console.log("Online Users:", onlineUsers);
    });

    // ✅ SEND MESSAGE
    socket.on("sendMessage", ({ senderId, receiverId, message }) => {
        const receiverSocket = onlineUsers[receiverId];

        if (receiverSocket) {
            io.to(receiverSocket).emit("receiveMessage", {
                senderId,
                message,
            });
        }
    });

    // ✅ DISCONNECT
    socket.on("disconnect", () => {
        console.log("User disconnected:", socket.id);

        // remove user from online list
        for (let userId in onlineUsers) {
            if (onlineUsers[userId] === socket.id) {
                delete onlineUsers[userId];
            }
        }

        // 🔥 update everyone
        io.emit("onlineUsers", Object.keys(onlineUsers));
    });
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT} 🚀`);
});