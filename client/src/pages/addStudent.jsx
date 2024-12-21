import React, { useEffect, useState } from 'react'
import Header from '../components/header';
import { Col, Layout, Row, Form, Input, Select, Button } from 'antd';
import Navebar from '../components/navebar';
import Tilte from "../components/title";
import { useSelector, useDispatch } from "react-redux";
import { allClassesReducer, addStudents } from '../redux/features/studentSlice';
import { toast } from "react-hot-toast";
import { useNavigate } from 'react-router-dom';


const initialStudent = {
  sname: "",
  saddress: "",
  sclass: "",
  sphone: "",
}

function addStudent() {
  const dispatch = useDispatch();
  const { loading, allClasses } = useSelector((state) => state.student);
  // console.log(allClasses);


  //initailstudate
  const [sdata, setSdata] = useState(initialStudent);

  //
  const navigate = useNavigate();


  //console.log(students)
  useEffect(() => {

    dispatch(allClassesReducer());

  }, [dispatch]);

  const onchangeInput = (e) => {
    const { name, value } = e.target;
    //console.log(name);
    setSdata((prevData) => (
      {
        ...prevData,
        [name]: value
      }
    ))
  }


  const handleSelectChange = (value) => {
    setSdata((prevData) => ({
      ...prevData,
      sclass: value
    }));
  }



  const handleSubmit = (e) => {
    //e.preventDefault();

    if (!sdata.sname || !sdata.saddress || !sdata.sclass || !sdata.sphone) {
      return toast.error("please fill all details");
    }

    //console.log(sdata);
    dispatch(addStudents({ sdata, toast, navigate }));


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
          <Tilte title="Add Student" />
          <Col span={12} style={{ margin: "20px auto", backgroundColor: "#f5f5f5", padding: "20px", borderRadius: "10px" }}>
            <Form onFinish={handleSubmit}>
              <Form.Item label="Name" rules={[{ required: true }]}>
                <Input name="sname" value={sdata.sname} onChange={onchangeInput} />
              </Form.Item>
              <Form.Item label="Adress" rules={[{ required: true }]}>
                <Input name="saddress" value={sdata.saddress} onChange={onchangeInput} />
              </Form.Item>
              <Form.Item label="Class" rules={[{ required: true }]}>
                <Select
                  name="sclass"
                  placeholder="please select the class"
                  allowClear
                  value={sdata.sclass}
                  onChange={handleSelectChange}
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
                <Input name="sphone" value={sdata.sphone} onChange={onchangeInput} />
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

export default addStudent
