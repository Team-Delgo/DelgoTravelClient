import React from "react";
import { useNavigate } from "react-router-dom";
import LeftArrow from "../../icons/left-arrow.svg";

function ChangeUserInfo(){
  const navigate = useNavigate();

  return <div className="userinfo">
    <div className="userinfo-header">
      <img src={LeftArrow} alt="back" className="userinfo-header-back" onClick={()=>{
        navigate(-1);
      }} />
      <div className="userinfo-header-title">내 정보 관리</div>
    </div>
  </div>
};

export default ChangeUserInfo;