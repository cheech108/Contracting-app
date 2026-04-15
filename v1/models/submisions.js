import mongoose from "mongoose";
const ResponseSchema = new mongoose.Schema({
  formId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Form",
    required: true,
    index: true
  },
  hoursWorked: {
    type: Number,
    required: true
  },

  submisionDate: {
    type: Date,
    required: true
  },

  submittedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    default: null
  },

  answers: {
    type: Map,
    of: mongoose.Schema.Types.Mixed
    // Example:
    // {
    //   "q1": "Frank",
    //   "q2": "test@email.com",
    //   "q3": ["a", "b"]
    // }
  }

}, { timestamps: true });

export default mongoose.model("Response", ResponseSchema);