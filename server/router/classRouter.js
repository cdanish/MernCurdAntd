import express from "express";
import { addClass, getAllClasses } from "../controller/studentClassController.js";


//router
const router = express.Router();

//addclass
router.post("/addclass",addClass);

router.get("/allclasses",getAllClasses);


export default router;