import job from "../models/Jobs.js"

export async function create(req, res){
    const { title, positions } = req.body;
    const creator = req.user._id;
    try {
        const existingJob = await job.findOne({ title });
        if (existingJob)
            return res.status(400).json({
                status: "failed",
                data: [],
                message: "A job with this title already exists",
            });
        const newJob = new job({
            title,
            positions,
            creator,
            contractors: new Map()
        });
        const savedJob = await newJob.save();
        res.status(200).json({
            status: "success",
            data: [savedJob],
            message:
                "Thank you for registering a new Job. It has been successfully created",
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

export async function addContractor(req, res) {
    const { jobId, position } = req.body;
    const userId = req.user._id.toString();
    try {
        const foundJob = await job.findById(jobId);
        if (!foundJob) {
            return res.status(404).json({
                status: "failed",
                message: "Job not found",
            });
        }
        if (!foundJob.positions.has(position)) {
            return res.status(400).json({
                status: "failed",
                message: "Position does not exist in this job",
            });
        }
        // ensures the map has actually been created
        if (!foundJob.contractors) {
            foundJob.contractors = new Map();
        }
        console.log(userId);
        foundJob.contractors.set(userId, position);
        foundJob.markModified('contractors');
        await foundJob.save();
        res.status(200).json({
            status: "success",
            data: [foundJob],
            message: "you have joined the job succsesfully",
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