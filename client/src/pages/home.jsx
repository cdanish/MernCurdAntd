import React from 'react';
import Header from '../components/header';
import { Col, Layout, Row } from 'antd';
import Navebar from '../components/navebar';
import Tilte from "../components/title";
import Table from "../components/table";


function home() {
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
        <Col span={20} style={{ margin: "0px auto" }}>
          <Tilte title="All Records"/>
        </Col>
      </Row>
      <Row>
        <Col span={20} style={{ margin: "0px auto" }}>
         <Table/>
        </Col>
      </Row>
    </Layout>


  )
}

export default home
