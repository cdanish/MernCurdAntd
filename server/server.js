import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import morgan from "morgan";
import dotenv from "dotenv";
import connectDb  from "./lib/db.js";
import classRouter from "./router/classRouter.js";
import studentRourter from "./router/studentRouter.js";
import { createServer } from '@vercel/node';


//dotenv
dotenv.config();

//port
const port = "8080";

//app
const app = express();

//db
connectDb();




//middleware
app.use(morgan("dev"));
app.use(express.json({ limit: '30mb', extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());


app.get("/",(req,res)=>{
    return res.send("<h2>curd antd vite redux </h2>");
});
//route
app.use("/api",classRouter);
app.use("/api",studentRourter);

// app.listen(port,()=>{
//     console.log(`server running on ${port}`);
// })

export default createServer(app);