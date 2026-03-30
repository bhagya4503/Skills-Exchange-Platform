import { useEffect, useState } from "react";
import API from "../services/api";
import { useAuth } from "../context/AuthContext";
import styles from "./Profile.module.css";
import { useRef } from "react";

function Profile() {
    const { user: authUser, login } = useAuth();
    const fileRef = useRef();
    const [user, setUser] = useState(null);
    const [form, setForm] = useState({
        skillsHave: "",
        skillsWant: "",
        bio: "",
        availability: "",
    });

    const [avatar, setAvatar] = useState("");

    useEffect(() => {
        fetchUser();
    }, []);

    const fetchUser = async () => {
        const { data } = await API.get("/users/me");
        setUser(data);
        setAvatar(data.avatar || "");
    };

    const removeSkill = (type, skill) => {
        if (type === "have") {
            setUser({
                ...user,
                skillsHave: user.skillsHave.filter((s) => s !== skill),
            });
        } else {
            setUser({
                ...user,
                skillsWant: user.skillsWant.filter((s) => s !== skill),
            });
        }
    };
    // handle avatar change
    const handleAvatarChange = (e) => {
        const file = e.target.files[0];

        const reader = new FileReader();
        reader.onloadend = () => {
            setAvatar(reader.result); // base64
        };

        if (file) {
            reader.readAsDataURL(file);
        }
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // const updatedData = {
        //     skillsHave: [
        //         ...user.skillsHave,
        //         ...form.skillsHave
        //             .split(",")
        //             .map((s) => s.trim().toLowerCase())
        //             .filter((s) => s && !user.skillsHave.includes(s)),
        //     ],
        //     skillsWant: [
        //         ...user.skillsWant,
        //         ...form.skillsWant
        //             .split(",")
        //             .map((s) => s.trim().toLowerCase())
        //             .filter((s) => s && !user.skillsWant.includes(s)),
        //     ],
        //     bio: form.bio || user.bio,
        //     availability: form.availability || user.availability,
        //     avatar: avatar,
        // };
        const updatedData = {
            skillsHave: user.skillsHave,
            skillsWant: user.skillsWant,
            bio: form.bio || user.bio,
            availability: form.availability || user.availability,
            avatar: avatar,
        };


        const { data } = await API.put("/users/update", updatedData);

        setUser(data);
        setAvatar(data.avatar);
        // login(data);
        login({ ...authUser, ...data });

        // await fetchUser();

        setForm({
            skillsHave: "",
            skillsWant: "",
            bio: "",
            availability: "",
        });

        alert("Profile Updated");
    };

    if (!user) return <p>Loading...</p>;

    return (
        <div className={styles.container}>

            {/* 🔥 PROFILE CARD */}

            <div className={styles.profileCard}>

                <div className={styles.avatarWrapper} onClick={() => fileRef.current.click()}>

                    <img
                        src={
                            avatar ||
                            "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                        }
                        className={styles.avatar}
                        alt="avatar"
                    />
                    {/* Camera Icon */}
                    <div className={styles.cameraIcon}>
                        📷
                    </div>
                </div>

                <input
                    type="file"
                    ref={fileRef}
                    className="d-none"
                    onChange={handleAvatarChange}
                />

                <div className={styles.name}>{user.name}</div>
                <div className={styles.email}>{user.email}</div>

                <p><strong>Bio:</strong> {user.bio}</p>
                <p><strong>Availability:</strong> {user.availability}</p>

                {/* SKILLS HAVE */}
                <div className={styles.skillsContainer}>
                    <strong>Skills Have:</strong><br />
                    {user.skillsHave.map((skill, i) => (
                        <span
                            key={i}
                            className={styles.skill}
                            onClick={() => removeSkill("have", skill)}
                        >
                            {skill} ❌
                        </span>
                    ))}
                </div>

                {/* SKILLS WANT */}
                <div className={styles.skillsContainer}>
                    <strong>Skills Want:</strong><br />
                    {user.skillsWant.map((skill, i) => (
                        <span
                            key={i}
                            className={styles.skill}
                            onClick={() => removeSkill("want", skill)}
                        >
                            {skill} ❌
                        </span>
                    ))}
                </div>

            </div>
            {/* 🔥 UPDATE FORM */}
            <div className="card p-4 shadow-sm">
                <h5 className="mb-3">Update Profile</h5>

                {/* skills have */}
                <input
                    type="text"
                    name="skillsHave"
                    placeholder="Add skills you have"
                    className="form-control mb-3"
                    value={form.skillsHave}
                    onChange={handleChange}
                />

                {/* skills want */}
                <input
                    type="text"
                    name="skillsWant"
                    placeholder="Add skills you want"
                    className="form-control mb-3"
                    value={form.skillsWant}
                    onChange={handleChange}
                />

                {/* bio */}
                <textarea
                    name="bio"
                    className="form-control mb-3"
                    placeholder="Update bio"
                    value={form.bio}
                    onChange={handleChange}
                />

                {/* availability */}
                <select
                    name="availability"
                    className="form-select mb-3"
                    value={form.availability}
                    onChange={handleChange}
                >
                    <option value="">Select Availability</option>
                    <option value="Weekend">Weekend</option>
                    <option value="Weekdays">Weekdays</option>
                    <option value="Morning">Morning</option>
                    <option value="Evening">Evening</option>
                </select>

                <button className="btn btn-primary w-100" onClick={handleSubmit}>
                    Save Changes
                </button>
            </div>

        </div>
    );
}

export default Profile;