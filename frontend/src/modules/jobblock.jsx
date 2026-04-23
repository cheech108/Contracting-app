import React, { useState,useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import './jobblock.css';

const Jobblock = (props) => {
    const navigate = useNavigate();
    const [job, setJob] = useState(null);
    
    const getJob = async () => {
        try {
            const response = await fetch(`http://localhost:5005/v1/jobs/get-job?jobId=${props.jobId}`, {
                method: "GET",
            });
            if (response.ok) {
                const data = await response.json();
                return data.data[0];
            } else {
                return "ERROR";
            }
        } catch (error) {
            console.error("Error:", error);
            return "ERROR";
        }
    };

    useEffect(() => {
        getJob().then(setJob);
    }, []);

    if (!job) return

    return (
    <div className="jobContainer" onClick={() => navigate(`/form/${props.jobId}`)}>
        <h1>{job.title}</h1>
        <button className="jobbutton">Open</button>
    </div>
    );
};

export default Jobblock;