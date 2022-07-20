import React from 'react';
import { useNavigate } from 'react-router-dom';
import LeftArrow from '../../icons/LeftArrow.svg';

function ChangePasswordCheck() {
  const navigate = useNavigate();
  return (
    <div>
      <div className="userinfo-header">
        <img
          src={LeftArrow}
          alt="back"
          aria-hidden="true"
          className="userinfo-header-back"
          onClick={() => {
            navigate(-1);
          }}
        />
        <div className="userinfo-header-title">내 정보 관리</div>
      </div>
    </div>
  );
}

export default ChangePasswordCheck;
