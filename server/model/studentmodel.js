import mongoose from "mongoose";
import AutoIncrement from "mongoose-sequence";


const studentSchema = new mongoose.Schema({

    sid:{
        type:Number,
    },
    sname:{
        type:String,
        required:true,
    },
    saddress:{
        type:String,
        required:true,
    },
    sclass: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "studentclass",  
        required: true,
    },
    sphone:{
        type:Number,
        required:true,
    }

});

studentSchema.plugin(AutoIncrement(mongoose),{ inc_field: 'sid' })

const studentModel = mongoose.models.student || mongoose.model("student",studentSchema);

export default studentModel;

