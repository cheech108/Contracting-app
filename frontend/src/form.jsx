import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import Navbar from "./modules/navbar";
import "./form.css"

function Form() {
    const { jobId } = useParams();

    const [form, setForm] = useState(null);
    const [jobData, setJN] = useState(null);
    const [HoursWokred, setHW] = useState(null);
    const [answers, setAnswers] = useState([
            {}
        ]);

    const updateAnswer = (id, property, newValue) => {
        setAnswers(answers.map(field =>
            field.id === id ? { ...field, [property]: newValue } : field
        ));
    };

    const getJobName = async () => {
        const token = localStorage.getItem("token");
        try {
            const response = await fetch(`http://localhost:5005/v1/jobs/get-job?jobId=${jobId}`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });
            if (response.ok) {
                const data = await response.json();
                return data.data[0];
            }
        } catch (error){
            console.error("Error:", error);
            return "ERROR";
        }
    }
    const getForm = async () => {
            try {
                const token = localStorage.getItem("token");
                
                const response = await fetch(`http://localhost:5005/v1/jobs/get-job?jobId=${jobId}`, {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                });
                if (response.ok) {
                    const data = await response.json();
                    const formId = data.data[0].form;
                    try{
                        const fresponse = await fetch(`http://localhost:5005/v1/jobs/get-form?formId=${formId}`, {
                            method: "GET",
                        });
                        if (response.ok) {
                            const fdata = await fresponse.json();
                            return fdata.data[0].fields;
                        }
                    } catch (error) {
                        console.error("Error:", error);
                        return "ERROR";
                    }
                } else {
                    return "ERROR";
                }
            } catch (error) {
                console.error("Error:", error);
                return "ERROR";
            }
        };

        const setA = async () => {
            return form.map(field => ({
                id: field.id,
                answer: ""
            }));
        }
    
        const handleSubmit = async (e) => {
            e.preventDefault();
            try {
                const token = localStorage.getItem("token");
                
                const responseToSend = {
                    "formId":jobData.form,
                    "hoursWorked":HoursWokred,
                    "answers":answers
                }
                console.log(responseToSend)
                const response = await fetch(`http://localhost:5005/v1/jobs/respond-form`, {
                    method: "Post",
                    headers: {
                        "Authorization": `Bearer ${token}`
                    },
                    body: JSON.stringify(responseToSend)
                });
                if (response.ok) {
                    return
                } else {
                    return "ERROR";
                }
            } catch (error) {
                console.error("Error:", error);
                return "ERROR";
            }
        }
        
        useEffect(() => {
                getForm().then(setForm)
                getJobName().then(setJN)
            }, []);
        
        useEffect(() => {
            if (!form) return;
            setA().then(setAnswers);
        }, [form]);

        if (!form){ 
            return
        }
    
    return (
        <div className="form-body">
            <Navbar />
            <h1 className="title">Submit hours to {jobData.title}</h1>
            <div className="form">
                <div className="innerQuestion">
                    <h1>Hours worked</h1>
                    <input type="number" onChange={(e) => setHW(e.target.value)} />
                </div>
                <form onSubmit={handleSubmit}>
                    {
                        form.map((field)=>(
                            <div key={field.id}>
                                <div className="innerQuestion">
                                    <h1>{field.label}</h1>
                                    {(field.type==="text" && <input onChange={(e) => updateAnswer(field.id, "answer", e.target.value)} />)}
                                    {(field.type==="radio" && Array.isArray(field.options) && field.options.map(option => (
                                        <label key={option} className="radio-option">
                                        <input
                                        type="radio"
                                        name={`field-${field.id}`}
                                        value={option}
                                        checked={answers.find(a => a.id === field.id)?.answer === option}
                                        onChange={() => updateAnswer(field.id, "answer", option)}
                                        />
                                        {option}
                                        </label>
                                    )))}
                                    {(field.type==="dropdown" && Array.isArray(field.options) && <div>
                                        <select onChange={(e) => updateAnswer(field.id, "answer", e.target.value)}>
                                            {field.options.map(option => (
                                                <option value={option}>{option}</option>
                                            ))}
                                        </select>
                                    </div>)}
                                </div>
                            </div>
                        ))
                    }
                <button style={{color:"white",width:"100%",borderRadius:"15px",backgroundColor:"blue"}} type="submit">Submit</button>
                </form>
            </div>
        </div>
);
}

export default Form;