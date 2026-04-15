import Form from "../models/forms.js";
import Response from "../models/submisions.js";

export async function createForm(req, res){
    const { fields } = req.body;
    try {
            const newForm = new Form({
                fields
            });
            const savedForm = await newForm.save();
            res.status(200).json({
                status: "success",
                data: [savedForm],
                message:
                    "Thank you for registering a new Form. It has been successfully created",
            });
        } catch (err) {
            res.status(500).json({
                status: "error",
                code: 500,
                data: [],
                message: "Internal Server Error",
            });
        }
}

export async function createSubmission(req, res){
    const { formId, answers, hoursWorked } = req.body;
    const uid = req.user._id;
    const time = new Date();
    try {
            const newResponse = new Response({
                formId,
                hoursWorked,
                submisionDate: time,
                submittedBy: uid,
                answers
            });
            const savedResponse = await newResponse.save();
            res.status(200).json({
                status: "success",
                data: [savedResponse],
                message:
                    "Thank you for submitting a form response",
            });
        } catch (err) {
            console.error('Error creating submission:', err);
            res.status(500).json({
                status: "error",
                code: 500,
                data: [],
                message: "Internal Server Error",
            });
        }
}