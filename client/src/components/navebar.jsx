import React from 'react';
import {Link} from "react-router-dom";

function navebar() {
  return (
    <div style={{padding:"10px",backgroundColor:"#000",textTransform:"uppercase",color:"#fff"}}>
      <ul style={{listStyle:"none"}}>
        <li style={{display:"inline-block",padding:"8px 10px"}}><Link to={"/"}>Home</Link></li>
        <li style={{display:"inline-block",padding:"8px 10px"}}><Link to={"/addstudent"}>Add</Link></li>
        {/* <li style={{display:"inline-block",padding:"8px 10px"}}><Link to={"/updatestudent"}>update</Link></li> */}
        {/* <li style={{display:"inline-block",padding:"8px 10px"}}><Link to={"/deletestudent"}>delete</Link></li> */}
      </ul>
    </div>
  )
}

export default navebar
