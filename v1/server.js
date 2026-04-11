import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import { PORT, URI } from "./config/index.js";
import Router from "./routes/index.js";

const server = express();

server.use(cors({
    origin: 'http://localhost:5173', // Allow your React dev server
    credentials: true // Allow cookies to be sent cross-origin
}));
server.disable("x-powered-by");
server.use(cookieParser());
server.use(express.urlencoded({ extended: false }));
server.use(express.json());

//database connection
mongoose.promise = global.Promise;
mongoose.set("strictQuery", false);
mongoose
    .connect(URI)
    .then(console.log("Connected to database"))
    .catch((err) => console.log(err));

//configure routes
Router(server);

server.listen(PORT, () =>
    console.log(`Server running on http://localhost:${PORT}`)
);