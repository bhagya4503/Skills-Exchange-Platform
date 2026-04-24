// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import API from "../services/api";

// function UserProfile() {
//     const { id } = useParams();
//     const [user, setUser] = useState(null);

//     useEffect(() => {
//         const fetchUser = async () => {
//             const { data } = await API.get(`/users/${id}`);
//             setUser(data);
//         };

//         fetchUser();
//     }, [id]);

//     if (!user) return <p>Loading...</p>;

//     return (
//         <div className="container mt-4">
//             <div className="card p-4 shadow-sm">
//                 <img
//                     src={
//                         user.avatar ||
//                         "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
//                     }
//                     style={{ width: "120px", borderRadius: "50%" }}
//                     alt="avatar"
//                 />

//                 <h3 className="mt-3">{user.name}</h3>
//                 <p>{user.email}</p>

//                 <p><strong>Bio:</strong> {user.bio}</p>
//                 <p><strong>Availability:</strong> {user.availability}</p>

//                 <p>
//                     <strong>Skills Have:</strong>{" "}
//                     {user.skillsHave.join(", ")}
//                 </p>

//                 <p>
//                     <strong>Skills Want:</strong>{" "}
//                     {user.skillsWant.join(", ")}
//                 </p>
//             </div>
//         </div>
//     );
// }

// export default UserProfile;


import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../services/api";
import styles from "./UserProfile.module.css";

function UserProfile() {
    const { id } = useParams();
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            const { data } = await API.get(`/users/${id}`);
            setUser(data);
        };

        fetchUser();
    }, [id]);

    if (!user) return <p className={styles.loading}>Loading profile...</p>;

    return (
        <div className={styles.container}>

            {/* HEADER */}
            <div className={styles.header}>
                <div className={styles.cover}></div>

                <div className={styles.profileSection}>
                    <img
                        src={
                            user.avatar ||
                            "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                        }
                        alt="avatar"
                        className={styles.avatar}
                    />

                    <div className={styles.info}>
                        <h2>{user.name}</h2>
                        <p className={styles.email}>{user.email}</p>
                        <p className={styles.availability}>
                            {user.availability || "Not specified"}
                        </p>
                    </div>

                    <button className={styles.messageBtn} onClick={() => navigate(`/chat/${user._id}`)}>
                        Message
                    </button>
                </div>
            </div>

            {/* ABOUT */}
            <div className={styles.card}>
                <h4>About</h4>
                <p>{user.bio || "No bio available"}</p>
            </div>

            {/* SKILLS */}
            <div className={styles.card}>
                <h4>Skills</h4>

                <div className={styles.skillsWrapper}>
                    <div>
                        <p className={styles.label}>Skills Have</p>
                        <div className={styles.skills}>
                            {user.skillsHave.map((skill, i) => (
                                <span key={i} className={styles.skill}>
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div>
                        <p className={styles.label}>Wants to Learn</p>
                        <div className={styles.skills}>
                            {user.skillsWant.map((skill, i) => (
                                <span key={i} className={styles.skillSecondary}>
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default UserProfile;