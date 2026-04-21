import React, { useState, useEffect } from "react";
import Navbar from "./modules/navbar.jsx";
import Jobblock from "./modules/jobblock.jsx";
import CreateJob from "./modules/creatjob.jsx";
import './dash.css';

function Dash() {
    const [user, setUserData] = useState(null);
    const [showPopup, setShowPopup] = useState(false);

    const handleLogin = async () => {
        try {
            const token = localStorage.getItem("token");
            
            const response = await fetch("http://localhost:5005/v1/user", {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });
            if (response.ok) {
                const data = await response.json();
                console.log(data)
                return data.user;
            } else {
                return "ERROR";
            }
        } catch (error) {
            console.error("Error:", error);
            return "ERROR";
        }
    };

    useEffect(() => {
        handleLogin().then(setUserData);
    }, []);

    if (!user) return

    return (
        <div className="dash-body">
            <Navbar />
            <div className="dash-header">
                <h1 className="welcome-message">Welcome {user.first_name}!</h1>
                <button className="create-button" onClick={() => setShowPopup(true)}>Create Job</button>
            </div>
            {
                user.jobs.map((job) => (
                    <Jobblock jobId={job} />
                ))
            }
            {showPopup && (
                <div className="popup-overlay" >
                    <div className="popup-form" onClick={(e) => e.stopPropagation()}>
                        <CreateJob />
                    </div>
                    <button onClick={() => setShowPopup(false)}>close</button>
                </div>
            )}
        </div>
    );
}

export default Dash;