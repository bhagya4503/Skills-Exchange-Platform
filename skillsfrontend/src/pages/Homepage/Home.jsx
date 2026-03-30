import { Link } from "react-router-dom";
import styles from "./Home.module.css";
import { FaUsers, FaExchangeAlt, FaBolt, FaCheckCircle } from "react-icons/fa";

function Home() {
    return (
        <div>

            {/* HERO */}
            <section className={`container ${styles.hero}`}>
                <div className="row align-items-center">
                    <div className="col-md-6">
                        <h1 className={styles.heroTitle}>
                            Exchange Skills. <br /> Grow Together 🚀
                        </h1>

                        <p className={styles.heroText}>
                            Learn what you want by teaching what you know.
                            No money. Just real people and real skills.
                        </p>

                        <div className="mt-4">
                            <Link to="/register" className="btn btn-primary btn-lg me-3">
                                Get Started
                            </Link>
                            <Link to="/login" className="btn btn-outline-dark btn-lg">
                                Login
                            </Link>
                        </div>
                    </div>

                    <div className="col-md-6 text-center">
                        <img
                            src="https://cdn-icons-png.flaticon.com/512/4140/4140037.png"
                            className={styles.heroImg}
                            alt="hero"
                        />
                    </div>
                </div>
            </section>

            {/* HOW IT WORKS */}
            <section className={styles.section}>
                <div className="container text-center">
                    <h2 className={styles.heading}>How It Works</h2>

                    <div className="row mt-5">
                        <div className="col-md-4">
                            <div className={styles.card}>
                                <FaUsers className={styles.icon} />
                                <h5>Create Profile</h5>
                                <p>Add your skills and what you want to learn.</p>
                            </div>
                        </div>

                        <div className="col-md-4">
                            <div className={styles.card}>
                                <FaExchangeAlt className={styles.icon} />
                                <h5>Find Matches</h5>
                                <p>Get matched with people who complement your skills.</p>
                            </div>
                        </div>

                        <div className="col-md-4">
                            <div className={styles.card}>
                                <FaBolt className={styles.icon} />
                                <h5>Start Learning</h5>
                                <p>Connect and start exchanging knowledge instantly.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* FEATURES */}
            <section className={`${styles.section} ${styles.lightBg}`}>
                <div className="container text-center">
                    <h2 className={styles.heading}>Features</h2>

                    <div className="row mt-5">
                        <div className="col-md-3">
                            <div className={styles.featureBox}>Skill Matching</div>
                        </div>
                        <div className="col-md-3">
                            <div className={styles.featureBox}>No Money</div>
                        </div>
                        <div className="col-md-3">
                            <div className={styles.featureBox}>Real People</div>
                        </div>
                        <div className="col-md-3">
                            <div className={styles.featureBox}>Flexible Time</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* BENEFITS */}
            <section className={styles.section}>
                <div className="container">
                    <h2 className={`text-center ${styles.heading}`}>Why Choose Us?</h2>

                    <div className="row mt-5">
                        <div className="col-md-4">
                            <p><FaCheckCircle /> Learn without spending money</p>
                        </div>
                        <div className="col-md-4">
                            <p><FaCheckCircle /> Improve communication skills</p>
                        </div>
                        <div className="col-md-4">
                            <p><FaCheckCircle /> Build meaningful connections</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className={styles.cta}>
                <div className="container text-center">
                    <h2>Start Learning Today</h2>
                    <Link to="/register" className="btn btn-light mt-3">
                        Join Now
                    </Link>
                </div>
            </section>

        </div>
    );
}

export default Home;