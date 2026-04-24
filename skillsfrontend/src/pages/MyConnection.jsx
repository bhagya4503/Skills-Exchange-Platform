import { useEffect, useState } from "react";
import API from "../services/api";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function MyConnections() {
    const [connections, setConnections] = useState([]);
    const { user: currentUser } = useAuth(); // ✅ IMPORTANT
    const navigate = useNavigate();

    useEffect(() => {
        fetchConnections();
    }, []);

    const fetchConnections = async () => {
        const { data } = await API.get("/requests/connections");
        setConnections(data);
    };

    return (
        <div>
            <h3 className="mb-4">My Connections</h3>

            {connections.length === 0 && <p>No connections yet</p>}

            <div className="row">
                {connections.map((conn) => {

                    // ✅ THIS IS THE IMPORTANT PART
                    const otherUser =
                        conn.fromUser._id === currentUser._id
                            ? conn.toUser
                            : conn.fromUser;

                    return (
                        <div className="col-md-4 mb-3" key={conn._id}>
                            {/* <div className="card p-3 shadow-sm"> */}
                            <div
                                className="card p-3 shadow-sm"
                                style={{ cursor: "pointer" }}
                                onClick={() => navigate(`/user/${otherUser._id}`)}
                            >
                                <h5>{otherUser.name}</h5>
                                <p>{otherUser.email}</p>

                                <p>
                                    <strong>Skills:</strong>{" "}
                                    {otherUser.skillsHave.join(", ")}
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default MyConnections;