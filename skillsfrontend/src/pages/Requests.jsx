import { useEffect, useState } from "react";
import API from "../services/api";

function Requests() {
    const [requests, setRequests] = useState([]);
    const [sentRequests, setSentRequests] = useState([]);
    useEffect(() => {
        const fetchRequests = async () => {
            const { data } = await API.get("/requests/received");
            // setRequests(data);
            setRequests(data.filter((req) => req.status === "pending"));
        };

        fetchRequests();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            const received = await API.get("/requests/received");
            const sent = await API.get("/requests/sent");

            setRequests(received.data.filter((r) => r.status === "pending"));
            setSentRequests(sent.data);
        };

        fetchData();
    }, []);

    const handleResponse = async (requestId, action) => {
        try {
            await API.put("/requests/respond", {
                requestId,
                action,
            });

            // update UI instantly
            setRequests((prev) =>
                prev.map((req) =>
                    req._id === requestId ? { ...req, status: action } : req
                )
            );
        } catch (error) {
            alert("Error updating request");
        }
    };

    return (
        <div>
            <h3 className="mb-4">Incoming Requests</h3>

            {requests.length === 0 && <p>No requests</p>}

            <div className="row">
                {requests.map((req) => (
                    <div className="col-md-4 mb-3" key={req._id}>
                        <div className="card p-3 shadow-sm">
                            <h5>{req.fromUser.name}</h5>
                            <p>{req.fromUser.email}</p>

                            <p>
                                <strong>Skills:</strong>{" "}
                                {req.fromUser.skillsHave.join(", ")}
                            </p>

                            <p>Status: {req.status}</p>

                            {req.status === "pending" && (
                                <div className="d-flex gap-2">
                                    <button
                                        className="btn btn-success w-100"
                                        onClick={() =>
                                            handleResponse(req._id, "accepted")
                                        }
                                    >
                                        Accept
                                    </button>

                                    <button
                                        className="btn btn-danger w-100"
                                        onClick={() =>
                                            handleResponse(req._id, "rejected")
                                        }
                                    >
                                        Reject
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
            <h4 className="mt-5">Your Requests Status</h4>

            {sentRequests.map((req) => (
                <div key={req._id} className="card p-2 mb-2">
                    <p>
                        You sent request to <strong>{req.toUser.name}</strong>
                    </p>

                    {req.status === "accepted" && (
                        <p className="text-success">
                            ✅ {req.toUser.name} accepted your request
                        </p>
                    )}

                    {req.status === "rejected" && (
                        <p className="text-danger">
                            ❌ {req.toUser.name} rejected your request
                        </p>
                    )}

                    {req.status === "pending" && (
                        <p className="text-warning">⏳ Pending</p>
                    )}
                </div>
            ))}
        </div>
    );
}

export default Requests;