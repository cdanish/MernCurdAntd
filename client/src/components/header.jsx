import React from 'react';
import {Typography } from 'antd';

const {Title} = Typography;

function header() {
  return (
    <div style={{backgroundColor:"#1abc9c", textAlign:"center",padding:"15px"}}>
      <Title level={3} style={{textTransform:"uppercase",color:"#fff"}}>CurD Mern  & AntD</Title>
    </div>
  )
}

export default header
