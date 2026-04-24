import { useEffect, useState, useRef } from "react";
import { io } from "socket.io-client";
import API from "../services/api";
import { useAuth } from "../context/AuthContext";
import styles from "./Messaging.module.css";

const socket = io("http://localhost:5000");

function Messaging() {
    const { user } = useAuth();

    const [connections, setConnections] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [messages, setMessages] = useState([]);
    const [text, setText] = useState("");
    const messagesEndRef = useRef(null);
    const [onlineUsers, setOnlineUsers] = useState([]);

    // 🔥 JOIN SOCKET
    useEffect(() => {
        if (user?._id) {
            socket.emit("join", user._id);
        }
    }, [user]);

    // 🔥 RECEIVE MESSAGE (REAL-TIME)

    useEffect(() => {
        socket.on("receiveMessage", (data) => {
            const formattedMessage = {
                sender: data.senderId,
                message: data.message,
            };

            if (selectedUser && data.senderId === selectedUser._id) {
                setMessages((prev) => [...prev, formattedMessage]);
            } else {
                alert("New message received");
            }
        });

        return () => socket.off("receiveMessage");
    }, [selectedUser]);

    // 🔥 FETCH CONNECTIONS
    useEffect(() => {
        const fetchConnections = async () => {
            const { data } = await API.get("/requests/connections");
            setConnections(data);
        };

        fetchConnections();
    }, []);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);


    useEffect(() => {
        socket.on("onlineUsers", (users) => {
            setOnlineUsers(users);
        });

        return () => socket.off("onlineUsers");
    }, []);

    // 🔥 FETCH CHAT HISTORY
    const openChat = async (otherUser) => {
        setSelectedUser(otherUser);

        const { data } = await API.get(`/messages/${otherUser._id}`);
        setMessages(data);
    };

    // 🔥 SEND MESSAGE
    const sendMessage = async () => {
        if (!text.trim()) return;

        // save in DB
        await API.post("/messages", {
            receiverId: selectedUser._id,
            message: text,
        });

        // emit real-time
        socket.emit("sendMessage", {
            senderId: user._id,
            receiverId: selectedUser._id,
            message: text,
        });

        // update UI
        setMessages((prev) => [
            ...prev,
            // { sender: user._id, message: text },
            {
                sender: user._id,
                receiver: selectedUser._id,
                message: text
            }
        ]);

        setText("");
    };

    return (
        <div className={styles.container}>
            {/* LEFT SIDE - USERS */}
            <div className={styles.sidebar}>
                <h5>Chats</h5>

                {connections.map((conn) => {
                    const otherUser =
                        conn.fromUser._id === user._id
                            ? conn.toUser
                            : conn.fromUser;

                    return (
                        <div
                            key={conn._id}
                            className={styles.user}
                            onClick={() => openChat(otherUser)}
                        >
                            {otherUser.name}
                            <span className={styles.status}>
                                {onlineUsers.includes(otherUser._id) ? "🟢" : "⚪"}
                            </span>
                        </div>
                    );
                })}
            </div>

            {/* RIGHT SIDE - CHAT */}
            <div className={styles.chatBox}>
                {selectedUser ? (
                    <>
                        <div className={styles.header}>
                            {selectedUser.name}
                        </div>

                        <div className={styles.messages}>
                            {/* {messages.map((msg, i) => (
                                <div
                                    key={i}
                                    className={
                                        // msg.sender === user._id
                                        msg.sender.toString() === user._id
                                            ? styles.myMsg
                                            : styles.otherMsg
                                    }
                                >
                                    {msg.message}

                                </div>

                            ))} */}

                            {messages.map((msg, i) => {
                                const senderId = msg.sender || msg.senderId;

                                return (
                                    <div
                                        key={msg._id || i}
                                        className={
                                            senderId && senderId.toString() === user._id
                                                ? styles.myMsg
                                                : styles.otherMsg
                                        }
                                    >
                                        {msg.message}
                                    </div>
                                );
                            })}
                        </div>

                        <div className={styles.inputBox}>
                            <input
                                type="text"
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                                placeholder="Type a message..."
                            />
                            <button onClick={sendMessage}>Send</button>
                        </div>
                    </>
                ) : (
                    <p>Select a user to start chat</p>
                )}
            </div>
            <div ref={messagesEndRef} />
        </div>
    );
}

export default Messaging;