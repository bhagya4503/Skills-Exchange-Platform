import { useState } from "react";
import styles from "./Dashboard.module.css";
import Profile from "../Profile";
import Requests from "../Requests";
import Matches from "../Matches";
import MyConnection from "../MyConnection";
import Messaging from "../Messaging";
import Lectures from "../Lectures";
import { useAuth } from "../../context/AuthContext";

function Dashboard() {
    const [activeTab, setActiveTab] = useState("profile");
    const { user } = useAuth();
    const renderContent = () => {
        switch (activeTab) {
            case "profile":
                return <Profile />;
            case "matches":
                return <Matches />;
            case "requests":
                return <Requests />;
            case "connections":
                return <MyConnection />;
            case "chat":
                return <Messaging />;
            case "lectures":
                return <Lectures />;
            default:
                return <Profile />;
        }
    };

    return (
        <div className={styles.container}>

            {/* SIDEBAR */}
            <div className={styles.sidebar}>
                <div className={styles.profileBox}>
                    <div className={styles.avatarWrapper}>
                        <img
                            src={
                                user?.avatar ||
                                "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                            }
                            alt="avatar"
                            className={styles.avatar}
                        />
                    </div>

                    <h5>{user?.name}</h5>
                    <p className="text-muted small">{user?.email}</p>
                    {/* <option value="">{user.availability || "Select"}</option> */}
                </div>

                <button onClick={() => setActiveTab("profile")} className={styles.item}>
                    Update Profile
                </button>

                <button onClick={() => setActiveTab("matches")} className={styles.item}>
                    Matches
                </button>


                <button onClick={() => setActiveTab("requests")} className={styles.item}>
                    Requests
                </button>

                <button onClick={() => setActiveTab("connections")} className={styles.item}>
                    My Connections
                </button>

                <button onClick={() => setActiveTab("chat")} className={styles.item}>
                    Messaging
                </button>

                <button onClick={() => setActiveTab("lectures")} className={styles.item}>
                    Ongoing Lectures
                </button>
            </div>

            {/* MAIN CONTENT */}
            <div className={styles.main}>
                {renderContent()}
            </div>

        </div>
    );
}

export default Dashboard;