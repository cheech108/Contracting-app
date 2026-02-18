import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
    {
        first_name: {
            type: String,
            required: "Your firstname is required",
            max: 25,
        },
        last_name: {
            type: String,
            required: "Your lastname is required",
            max: 25,
        },
        email: {
            type: String,
            required: "Your email is required",
            unique: true,
            lowercase: true,
            trim: true,
        },
        //password are not encrpted as I plan to encrypt them on the client side.
        password: {
            type: String,
            required: "Your password is required",
            select: false,
            max: 25,
        },
        //0:admin,1:contractor,2:company
        role: {
            type: Number,
            required: true,
            default: 1,
        },
    },
    { timestamps: true }
);
export default mongoose.model("users", UserSchema);