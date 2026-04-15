import express from "express";
import { check } from "express-validator";
import { create, addContractor } from "../controllers/jobs.js"
import { createForm, createSubmission } from "../controllers/forms.js"
import Validate from "../middleware/validate.js";
import Verify from "../middleware/verify.js";

const router = express.Router();

router.post(
    "/create",
    Verify,
    check("title")
        .notEmpty()
        .withMessage("Title is required"),
    check("positions")
        .notEmpty()
        .withMessage("At least one position is required"),
    Validate,
    create
);

router.post(
    "/add-contractor",
    Verify,
    check("jobId")
        .notEmpty()
        .withMessage("Job ID is required"),
    check("position")
        .notEmpty()
        .withMessage("Position is required"),
    Validate,
    addContractor
);

router.post(
    "/create-form",
    Verify,
    Validate,
    createForm
)

router.post(
    "/respond-form",
    Verify,
    Validate,
    createSubmission
)

export default router;