import { useEffect, useState } from "react";
import API from "../services/api";

function Matches() {
    const [matches, setMatches] = useState([]);

    useEffect(() => {
        const fetchMatches = async () => {
            const { data } = await API.get("/users/match");
            setMatches(data);
        };

        fetchMatches();
    }, []);

    const handleConnect = async (userId) => {
        try {
            await API.post("/requests/send", { toUserId: userId });
            alert("Request sent");
        } catch (error) {
            alert("Error sending request");
        }
    };

    return (
        <div>
            <h3 className="mb-4">Your Matches</h3>

            <div className="row">
                {matches.length === 0 && <p>No matches found</p>}

                {matches.map((user) => (
                    <div className="col-md-4 mb-3" key={user._id}>
                        <div className="card p-3 shadow-sm">
                            <h5>{user.name}</h5>
                            <p>{user.email}</p>

                            <p>
                                <strong>Has:</strong>{" "}
                                {user.skillsHave.join(", ")}
                            </p>

                            <p>
                                <strong>Wants:</strong>{" "}
                                {user.skillsWant.join(", ")}
                            </p>
                            <p><strong>Availability:</strong> {user?.availability}</p>
                            <button
                                className="btn btn-primary w-100"
                                onClick={() => handleConnect(user._id)}
                            >
                                Connect
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Matches;