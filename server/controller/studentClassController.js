import mongoose from "mongoose";
import classModel from "../model/classmodel.js";

//add class
export const addClass = async(req,res)=>{
    try{
        const {Cname} = req.body;

        //validation
        if(!Cname){
            return res.status(201).send({
                success:false,
                message:"please fill class name",
            });

        }

        const classExit = await classModel.findOne({Cname:Cname});
        if(classExit){
            return res.status(201).send({
                success:false,
                message:"class already Exits",
                data:classExit,
            });
        }

        const addClass = new classModel({Cname:Cname});
        await addClass.save();

        return res.status(200).send({
            success:true,
            message:"class created",
            data:addClass,
        })

    }catch(error){
        console.log(error);
        return res.status(500).send({
            success:false,
            message:"error while adding addclass",
            error:error,
        });
    }
} 

///get all classes
export const getAllClasses = async(req,res) =>{
    try{

        const allclasses = await classModel.find({});

        return res.status(200).send({
            success:true,
            message:"All Classes",
            data:allclasses,
        })

    }catch(error){
        console.log(error);
        return res.status(500).send({
            success:false,
            message:"error while getting all classes",
            error:error,
        });
    }
}