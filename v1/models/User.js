import mongoose from "mongoose";

import jwt from 'jsonwebtoken';
import { SECRET_ACCESS_TOKEN } from '../config/index.js';

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
        jobs:{
            type: mongoose.Schema.Types.Array
        }
    },
    { timestamps: true }
);
UserSchema.methods.generateAccessJWT = function () {
  let payload = {
    id: this._id,
  };
  return jwt.sign(payload, SECRET_ACCESS_TOKEN, {
    expiresIn: '20m',
  });
};
export default mongoose.model("users", UserSchema);