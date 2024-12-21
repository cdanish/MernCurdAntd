import mongoose from "mongoose";
import studentModel from "../model/studentmodel.js";
import classModel from "../model/classmodel.js";


//add student 
export const addStudent = async(req,res) =>{
    try{
        const {sname,saddress,sclass,sphone} = req.body;
        //console.log(req.body);

        const exitstudent= await studentModel.findOne({sname:sname});

        if(exitstudent){
            return res.status(201).send({
                success:false,
                message:"This student name is already available",
            });
        }


        ///get the objectid form classmodel
        const classid = await classModel.findOne({cid:sclass});

        console.log(sclass);
        if(!classid){
            return res.status(201).send({
                success:false,
                message:"please select the class name",
            });
        }




        const newStudent = new studentModel({
            sname:sname,
            saddress:saddress,
            sclass:classid._id,
            sphone:sphone,

        });

        

        await newStudent.save();

        return res.status(200).send({

            success:true,
            message:"Student added Successfully",
            data:newStudent,

        });
        

    }catch(error){
        console.log(error);
        return res.status(500).send({
            success:false,
            message:"error while adding student",
            error:error,
        });
    }

}

//get all student
export const getallstudent = async(req,res) =>{
    try{

        const allStudents = await studentModel.find().populate('sclass','Cname cid');
       
        //console.log(allStudents);
        if(!allStudents){
            res.status(200).send({

                success:false,
                message:"No Student Available",
    
            });
        }

        return res.status(200).send({

            success:true,
            message:"All student Records",
            data:allStudents,

        });

    }catch(error){
        console.log(error);
        return res.status(500).send({
            success:false,
            message:"error while getting all student",
            error:error,
        });
    }
}


//get student record by id
export const getStudentById =async (req,res)=>{
    try{

        const {id} = req.params;

        const singleStudentRecord = await studentModel.findOne({sid:id}).populate('sclass','Cname cid');

        if(!singleStudentRecord){
            return res.status(201).send({
                success:false,
                message:"Student is not avaiable",
            });
        }

        return res.status(200).send({

            success:true,
            message:"single user record",
            data:singleStudentRecord,


        });

    }catch(error){
        console.log(error);
        return res.status(500).send({
            success:false,
            message:"error white getting the single student record",
            error:error,
        })
    }

}


//update student details
export const updateStudentDetails = async  (req,res) =>{

    try{
        const {id} = req.params;
       
        

        const studentAvailable = await studentModel.findOne({sid:id});

        if(!studentAvailable){
            return res.status(404).send({
                success:false,
                message:"Student is not avaiable with this id",
            });
        }


        const{sname,saddress,sclass,sphone} = req.body;

        //validataion
        if(!sname || !saddress || !sclass || !sphone){
            return res.status(200).send({
                success:false,
                message:"please fill all details",
            });
        }

        //check sclass update with proper mondbid 
        const cid = await classModel.findOne({cid:sclass});

        if(!cid){
            return res.status(200).send({
                success:false,
                message:"This class is not available",
            });
        }

        const updatedStudent= {
            sname,
            saddress,
            sphone,
            sclass:cid._id,
        }
        //update
        const updatedStudentData = await studentModel.findOneAndUpdate({sid:id},updatedStudent,{new:true}).populate('sclass', 'cid Cname');
        return res.status(200).send({
            success:true,
            message:"student Updated Successfully",
            data:updatedStudentData


        });



    }catch(error){
        console.log(error);
        return res.status(500).send({
            success:false,
            message:"error while updating studentdetails",
            error:error,
        })
    }
}

//deletestudent
export const deleteStudent = async (req,res) =>{
    try{

        const {id} = req.params;

        const deleteStudent = await studentModel.findOne({sid:id});
        if(!deleteStudent){
            return  res.status(200).send({
                success:false,
                message:"from this id student is not available",
            })
        }

        await studentModel.findOneAndDelete({sid:id});
        return res.status(200).send({
            success:"true",
            message:"Deleted Student successfully",
        })


    }catch(error){
        console.log(error);
        return res.status(500).send({

            success:false,
            message:"error while delete student",
            error:error,
        });
    }
}