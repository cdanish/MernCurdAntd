import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as api from "../api";



//get all classes
export const allClassesReducer = createAsyncThunk("student/allclasses", async (_, { rejectWithValue }) => {
    try {

        const response = await api.allClasses();

        return response.data;

    } catch (error) {
        console.log(error);
        return rejectWithValue(error);
    }
});

//getallstudents
export const getallstudents = createAsyncThunk("student/getstudent", async (_, { rejectWithValue }) => {

    try {

        const response = await api.allStudent();
        // console.log(response);

        return response.data;

    } catch (error) {
        console.log(error);
        return rejectWithValue(error);
    }

});


//addingstudent
export const addStudents = createAsyncThunk(
    'student/addstudent',
    async ({ sdata, toast, navigate }, { rejectWithValue }) => {
        try {
            //console.log(sdata);
            const response = await api.addStudent(sdata);
            toast.success('Student added successfully');
            navigate('/');
            return response.data;
        } catch (error) {
            toast.error('Failed to add student');
            return rejectWithValue({
                message: error.message || 'Something went wrong',
                status: error.response?.status,
            });
        }
    }
);


//studentdelete
export const deleteStudent = createAsyncThunk(
    'student/deletestudent', async ({ id, toast }, { rejectWithValue }) => {
        try {

            const response = await api.deleteStudent(id);

            toast.success("Student Deleted Successfully");
            return response.data;

        } catch (error) {
            toast.error('failed to delete Student');
            return rejectWithValue({
                message: error.message || 'Something went wrong',
                status: error.response?.status,
            })
        }
    }
);

//getsingleStudent
export const singleStudent = createAsyncThunk(
    'student/singleStudent', async(id,{rejectWithValue})=>{
        try {

            //console.log(id)
            const response = await api.singleStudent(id);
            //console.log(response);

            return response?.data;
            
        } catch (error) {
            return rejectWithValue({
                message:error.message,
                status: error.response?.status,
            })
            
        }
    }
);

//updateStudent
export const updateStudentData = createAsyncThunk(
    'student/updateStudent',async({id,sdata,toast,navigate},{rejectWithValue}) =>{
        try{

            console.log(id,sdata,toast,navigate);
            const response = await api.updateStudent(sdata,id);

            console.log(response);
            toast("updated Student Data");
            navigate("/");

            return response?.data;
           



        }catch(error){
            return rejectWithValue({
                message:error.message,
                status: error.response?.status,
            });
        }
    }
)












const studentSlice = createSlice({
    name: "student",
    initialState: {

        loading: false,
        students: [],
        error: "",
        student: null,
        allClasses: [],

    },

    extraReducers: (builder) => {
        builder

            //get all classes
            .addCase(allClassesReducer.pending, (state) => {
                state.loading = true;
            })
            .addCase(allClassesReducer.fulfilled, (state, action) => {
                state.loading = false;
                state.allClasses = action.payload?.data;
                //console.log(state.allClasses);

            })
            .addCase(allClassesReducer.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            //getting all students
            .addCase(getallstudents.pending, (state) => {
                state.loading = true;

            })
            .addCase(getallstudents.fulfilled, (state, action) => {
                state.loading = false;
                state.students = action.payload?.data;
                // console.log(state.students);
            }).addCase(getallstudents.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            //addingStudent
            .addCase(addStudents.pending, (state) => {
                state.loading = true;
            })
            .addCase(addStudents.fulfilled, (state, action) => {
                state.loading = false;
                state.students = [action.payload];
            })
            .addCase(addStudents.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            //deletestudent
            .addCase(deleteStudent.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteStudent.fulfilled, (state, action) => {

                const { id } = action.meta.arg; 
                //console.log(id); 
                if (id) {
                    state.loading = false; 
                   
                    state.students = state.students.filter((student) => student.sid !== id);
                }
            })
            .addCase(deleteStudent.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            //updatestudent
            .addCase(updateStudentData.pending,(state)=>{
                state.loading = true;
            })
            .addCase(updateStudentData.fulfilled,(state,action)=>{
                const {id} = action.meta.arg;
                console.log(id);
                if(id){
                    state.loading= false;
                    state.students = state.students.map((student) =>
                        student.id === id ? { ...student, ...action.payload } : student
                    );
                }
            })
            .addCase(updateStudentData.rejected,(state,action)=>{
                state.loading = false;
                state.error = action.payload;
            })

            //getsingleStudent
            .addCase(singleStudent.pending,(state)=>{
                state.loading= true;
            })
            .addCase(singleStudent.fulfilled,(state,action)=>{
                state.loading = false;
                state.student = action.payload?.data;

            })
            .addCase(singleStudent.rejected,(state,action)=>{
                state.loading = false;
                state.error = action.payload;
            })


    },




});

export default studentSlice.reducer;