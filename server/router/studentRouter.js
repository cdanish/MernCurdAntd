import express from "express";
import { addStudent, deleteStudent, getallstudent, getStudentById, updateStudentDetails } from "../controller/studentController.js";

const router = express.Router();

//addstudent
router.post("/addstudent",addStudent);

//getall studen
router.get("/allstudent",getallstudent);

//getsinglestudent data
router.get("/singlestude/:id",getStudentById);

//updateStudentData
router.patch("/updateStudent/:id",updateStudentDetails);

//deleteStudent
router.delete("/deleteStudent/:id",deleteStudent);


export default router;