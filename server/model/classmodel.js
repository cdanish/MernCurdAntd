import mongoose from 'mongoose';
import AutoIncrement from 'mongoose-sequence';


// Create the schema
const classSchema = new mongoose.Schema(
    {
        cid: {
            type: Number,
        },
        Cname: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

classSchema.plugin(AutoIncrement(mongoose), { inc_field: 'cid' }); 

// Create the model
const classModel = mongoose.models.studentclass || mongoose.model('studentclass', classSchema);

export default classModel;
