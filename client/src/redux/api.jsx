import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:8080"
});

//get all Students
export const allStudent = () => API.get("/api/allstudent");

//add student
export const addStudent = (studentData) => API.post("/api/addstudent",studentData);

//get all classes
export const allClasses = () => API.get("api/allclasses");

//delete student
export const deleteStudent =(id) => API.delete(`api/deleteStudent/${id}`);

//getsingleStudent
export const singleStudent = (id) => API.get(`api/singlestude/${id}`);

//updateStudent
export const updateStudent = (updatedData,id) => API.patch(`api/updateStudent/${id}`,updatedData);


