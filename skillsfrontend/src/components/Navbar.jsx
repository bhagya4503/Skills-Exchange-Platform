import { Link, NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import styles from "./Navbar.module.css";
import { useAuth } from "../context/AuthContext";

function Navbar() {
    // const [user, setUser] = useState(null);
    const navigate = useNavigate();

    // useEffect(() => {
    //     const storedUser = JSON.parse(localStorage.getItem("userInfo"));
    //     setUser(storedUser);
    // }, []);

    const { user, logout } = useAuth();
    const handleLogout = () => {
        logout();
        navigate("/");
    };

    return (
        <nav className={`navbar navbar-expand-lg bg-white shadow-sm ${styles.navbar}`}>
            <div className="container">

                {/* LOGO */}
                <Link className="navbar-brand fw-bold" to="/">
                    SkillExchange
                </Link>

                {/* MOBILE TOGGLE */}
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                {/* NAV LINKS */}
                <div className="collapse navbar-collapse" id="navbarNav">

                    <ul className="navbar-nav mx-auto">

                        <li className="nav-item">
                            <NavLink to="/" className={styles.link}>
                                Home
                            </NavLink>
                        </li>

                        <li className="nav-item">
                            <NavLink to="/about" className={styles.link}>
                                About
                            </NavLink>
                        </li>

                        <li className="nav-item">
                            <NavLink to="/matches" className={styles.link}>
                                Browse Connections
                            </NavLink>
                        </li>

                        {user && (
                            <>
                                <li className="nav-item">
                                    <NavLink to="/dashboard" className={styles.link}>
                                        Dashboard
                                    </NavLink>
                                </li>

                                <li className="nav-item">
                                    <NavLink to="/requests" className={styles.link}>
                                        Requests
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink to="/matches" className={styles.link}>
                                        Match
                                    </NavLink>
                                </li>
                            </>
                        )}

                    </ul>

                    {/* RIGHT SIDE */}
                    <div className="d-flex align-items-center gap-2">

                        {!user ? (
                            <Link to="/login" className="btn btn-primary">
                                Login
                            </Link>
                        ) : (
                            <>
                                <span className="fw-semibold">👤 {user.name}</span>

                                <button
                                    className="btn btn-outline-danger"
                                    onClick={handleLogout}
                                >
                                    Logout
                                </button>
                            </>
                        )}

                    </div>

                </div>
            </div>
        </nav>
    );
}

export default Navbar;