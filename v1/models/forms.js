import mongoose from "mongoose";

const FieldSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
    enum: [
      "text",
      "radio",
      "checkbox",
      "dropdown"
    ]
  },
  label: {
    type: String,
    required: true
  },
  required: {
    type: Boolean,
    default: false
  },

  // For dropdown and radio
  options: [

  ],


  validation: {
    minLength: Number,
    maxLength: Number,
    min: Number,
    max: Number,
    regex: String
  }
}, { _id: false });


const FormSchema = new mongoose.Schema({

  fields: {
    type: [FieldSchema],
    validate: v => v.length > 0
  }

}, { timestamps: true });

export default mongoose.model("Form", FormSchema);