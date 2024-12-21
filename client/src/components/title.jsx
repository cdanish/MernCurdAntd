import React from 'react';
import {Typography } from 'antd';

const {Title} = Typography;

function title({title}) {
  return (
    <div style={{padding:"20px",backgroundColor:"#fff"}}>
       <Title level={2} style={{fontWeight:"700"}}>{title}</Title>
    </div>
  )
}

export default title
