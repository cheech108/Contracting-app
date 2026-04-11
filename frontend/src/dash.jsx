import React, { useState, useEffect } from "react";
import Navbar from "./modules/navbar.jsx";

function Dash() {
    const [userName, setUserName] = useState('');

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
                return data.user_name;
            } else {
                return "ERROR";
            }
        } catch (error) {
            console.error("Error:", error);
            return "ERROR";
        }
    };

    useEffect(() => {
        handleLogin().then(setUserName);
    }, []);

    return (
        <div>
            <Navbar />
            <p>{userName}</p>
        </div>
    );
}

export default Dash;