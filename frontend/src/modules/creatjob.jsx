import React, { useState } from 'react';

const CreateJob = () => {
    let [posOffset, setPOff] = useState(0);
    const [output, setOutput] = useState("");
    let [questionOffset, setQOff] = useState(0);
    const [jobTitle, setJobTitle] = useState("")
    const [positions, setPositions] = useState([
        { id: 0, name: "", pay: "" }
    ]);
    const [form, setForm] = useState([
        { id: 0, type: "text", label: "", required:false, options:[] }
    ]);

    //Im to lazy to rewrite addField ect. as addPosition ect. so Im not going to :)
    const addField = () => {
        const newField = {
            id: String(positions.length + posOffset),
            name: "",
            pay: ""
        };
        setPositions([...positions, newField]);
    };

    const addQuestion = () => {
        const newField = {
            id: String(form.length + questionOffset),
            type: "text",
            label: "",
            required: false,
            options: []
        };
        setForm([...form, newField]);
    };

    const removeField = (id) => {
        setPositions(positions.filter(field => field.id !== id));
        setPOff(posOffset+1);
    };

    const removeQuestion = (id) => {
        setForm(form.filter(field => field.id !== id));
        setQOff(questionOffset+1);
    };

    const updateField = (id, property, newValue) => {
        setPositions(positions.map(field =>
            field.id === id ? { ...field, [property]: newValue } : field
        ));
    };

    const updateFormField = (id, property, newValue) => {
        setForm(form.map(field =>
            field.id === id ? { ...field, [property]: newValue } : field
        ));
    };

    const updateFormOptions = (id, newValue) => {
        newValue = newValue.split(",")
        setForm(form.map(field =>
            field.id === id ? { ...field, "options": newValue } : field
        ));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        let formId = "";
        const formToSend = {fields:form};
        try {
            const token = localStorage.getItem("token");
            
            const response = await fetch("http://localhost:5005/v1/jobs/create-form", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formToSend)
            });
            if (response.ok) {
                const data = await response.json();
                console.log(data.data[0]._id);
                formId = data.data[0]._id;
            } else{
                const data = await response.json();
                console.log(data)
                setOutput(`ERROR ${data.data[0]}`)
                return
            }
        } catch (error) {
            console.error("Error:", error);
            return
        }
        let subpos = new Map();
        for (const pos of positions){
            subpos.set(pos.name,Number(pos.pay));
        }
        const jobToSend = {
            "title":jobTitle,
            "positions":Object.fromEntries(subpos),
            "form":formId
        }
        try {
            const token = localStorage.getItem("token");
            
            const response = await fetch("http://localhost:5005/v1/jobs/create-job", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(jobToSend)
            });
            if (response.ok) {
                const data = await response.json();
                console.log(data.data[0]._id);
                formId = data.data[0]._id;
            } else{
                const data = await response.json();
                setOutput(`ERROR ${data.data[0]}`)
                return
            }
        } catch (error) {
            console.error("Error:", error);
            return
        }
        setOutput("job sucsessfully created! You can now close this form.")
    };

    return (
        <form onSubmit={handleSubmit}>
            <div style={{display:"flex"}}>
                <p style={{textWrap:"nowrap"}}>Job title: </p>
                <input type="text" onChange={(e) => setJobTitle(e.target.value)} placeholder="Title"/>
            </div>
            <hr/>
            <h3 style={{textAlign:"center"}}>Positions</h3>
            {positions.map((field) => (
                <div key={field.id} style={{ marginBottom: '10px' }}>
                    <div style={{display:"flex"}}>
                        <input type="text" style={{height:"50px"}} onChange={(e) => updateField(field.id, "name", e.target.value)} placeholder="name"/>
                        <input type="text" style={{height:"50px"}} onChange={(e) => updateField(field.id, "pay", e.target.value)} placeholder="pay"/>
                    </div>
                    {positions.length > 1 && (
                        <button type="button" onClick={() => removeField(field.id)}>Remove</button>
                    )}
                </div>
            ))}
            <button type="button" onClick={addField}>Add Position</button>
            <hr/>
            <h3 style={{textAlign:"center"}}>Form</h3>
            <p>Contractors will fill this form out when subbmitting data.</p>
            {form.map((field) => (
                <div key={field.id} style={{ marginBottom: '10px' }}>
                    <div style={{display:"flex"}}>
                        <input type="text" style={{height:"50px"}} onChange={(e) => updateFormField(field.id, "label", e.target.value)} placeholder="label"/>
                        <div>
                            <p style={{marginBottom:"0px", marginLeft:"10px"}}>required?</p>
                            <input type="checkbox" checked={field.required} style={{height:"20px", width:"80px",margin:"0px"}} onChange={(e) => updateFormField(field.id, "required", e.target.checked)}/>
                        </div>
                    </div>
                    <div style={{display:"flex"}}>
                        <select name="" type={field.type} onChange={(e) => updateFormField(field.id, "type", e.target.value)}>
                            <option value="text">text</option>
                            <option value="dropdown">drop down</option>
                            <option value="radio">radio</option>
                        </select>
                        {(field.type === "dropdown"||field.type === "radio") && <textarea style={{height:"50px", width:"100%", fontSize:"10px"}} onChange={(e) => updateFormOptions(field.id, e.target.value)} placeholder="enter options for the question comma seperated EX: option1,option2"/>}
                    </div>
                    {form.length > 1 && (
                        <button type="button" onClick={() => removeQuestion(field.id)}>Remove</button>
                    )}
                </div>
            ))}
            <button type="button" onClick={addQuestion}>Add Question</button>
            <hr/>
            <button style={{color:"white",width:"100%",borderRadius:"15px",backgroundColor:"blue"}} type="submit">Submit</button>
            <p>{output}</p>
        </form>
    );
};

export default CreateJob;