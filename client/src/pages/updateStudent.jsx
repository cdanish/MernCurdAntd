import React,{useEffect, useState} from 'react'
import Header from '../components/header';
import { Col, Layout, Row, Form, Input, Select, Button } from 'antd';
import Navebar from '../components/navebar';
import Tilte from "../components/title";
import { useNavigate, useParams } from 'react-router-dom';
import {useDispatch,useSelector} from 'react-redux';
import {singleStudent,allClassesReducer,updateStudentData} from "../redux/features/studentSlice"
import { toast } from 'react-hot-toast';



const initialState= {
  sname :'',
  saddress :'',
  sclass:"",
  sphone:"",


};

function updateStudent() {
  //url id
  const {id} = useParams();

  //navigate
  const navigate = useNavigate();

  


  //dispatch
  const dispatch = useDispatch();

  //use student data
  const {student,allClasses} = useSelector((state)=>({...state.student}));


//console.log(allClasses);
  

  useEffect(()=>{

    if(id){
      dispatch(singleStudent(id));
      
    }
    dispatch(allClassesReducer());
   
    //console.log(sdata);


  },[id,dispatch]);

  useEffect(() => {
    if (student) {
      setSdata({
        sname: student.sname || '',
        saddress: student.saddress || '',
        sclass: student.sclass?.Cname || '',
        sphone: student.sphone || '',
      });
    }
  }, [student]);



  const [sdata,setSdata] = useState(initialState);
  

  

  //allinputss
  const onInputChange = (e) => {
    const { name, value } = e.target;
    
    setSdata({ ...sdata, [name]: value });
    //console.log(sdata);
  };

  const onSelectChange = (v) =>{
    setSdata({...sdata,sclass:v});
  }



  const handleFinish = () =>{

    console.log(sdata);
  
    if(id){

      dispatch(updateStudentData({id,toast,navigate,sdata}));
    }

  }

  


  return (
    <Layout className='mainDiv' style={{ backgroundColor: "transparent", margin: "50px" }}>
      <Row>
        <Col span={20} style={{ margin: "0px auto" }}>
          <Header />
        </Col>
      </Row>
      <Row>
        <Col span={20} style={{ margin: "0px auto" }}>
          <Navebar />
        </Col>
      </Row>
      <Row>
        <Col span={20} style={{ margin: "0px auto", backgroundColor: "#fff" }}>
          <Tilte title="Update Student" />
          <Col span={12} style={{ margin: "20px auto", backgroundColor: "#f5f5f5", padding: "20px", borderRadius: "10px" }}>
            <Form onFinish={handleFinish}>
              <Form.Item label="Name" rules={[{ required: true }]}>
                <Input name="sname" value={sdata?.sname} onChange={onInputChange}  />
              </Form.Item>
              <Form.Item label="Adress" rules={[{ required: true }]}>
                <Input name="saddress" value={sdata?.saddress} onChange={onInputChange} />
              </Form.Item>
              <Form.Item label="Class" rules={[{ required: true }]}>
                <Select
                  name="sclass"
                  
                  allowClear
                  value={sdata?.sclass}
                  onChange={onSelectChange}
                  
                >
                {allClasses && allClasses.map((classItem) => (
                    <Select.Option
                      key={classItem._id}
                      value={classItem.cid}
                    >
                      {classItem.Cname}
                    </Select.Option>
                  ))}
                 
                </Select>
              </Form.Item>

              <Form.Item label="Phone" rules={[{ required: true }]}>
                <Input name="sphone" value={sdata?.sphone} onChange={onInputChange}/>
              </Form.Item>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form>
          </Col>
        </Col>
      </Row>
    </Layout>
  )
}

export default updateStudent
