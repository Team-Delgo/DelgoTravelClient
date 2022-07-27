import React, { ChangeEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import RightArrow from '../../icons/right-arrow.svg';
import LeftArrow from '../../icons/left-arrow.svg';
import "./ChangeUserInfo.scss";
import { MY_ACCOUNT_PATH } from '../../constants/path.const';

function ChangeUserInfo() {
  const navigate = useNavigate();
  const initialNickName = useSelector((state: any) => state.persist.user.user.nickname);
  const [nickName, setNickName] = useState(initialNickName);

  const user = useSelector((state: any) => state.persist.user.user);
  const { email, phone } = user;

  const phoneNumber = `${phone.slice(0, 3)}-****-${phone.slice(7, 11)}`;
  const userEmail = `${email.slice(0, 4)}****${email.slice(8,)}`;

  const inputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setNickName(e.target.value);
  };

  return (
    <div className="userinfo">
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
      <div className="userinfo-user">회원정보</div>
      <div className="userinfo-nickname">
        <div className="userinfo-nickname-label">닉네임</div>
        {/* <span className="userinfo-phone-value">{nickName}</span> */}
        {/* 아직 닉네임 변경 api가 없어서 막아놈 */}
        <input onChange={inputChangeHandler} className="userinfo-nickname-input" value={nickName} />
      </div>
      <div className="userinfo-phone">
        <div className="userinfo-phone-label">휴대전화</div>
        <span className="userinfo-phone-value">{phoneNumber}</span>
      </div>
      <div className="userinfo-email">
        <div className="userinfo-email-label">이메일</div>
        <span className="userinfo-email-value">{userEmail}</span>
      </div>
      <div className='userinfo-devide' />
      <div className="userinfo-password" aria-hidden="true" onClick={() => { navigate(MY_ACCOUNT_PATH.PASSWORDCHECK); }}>
        <div className="userinfo-password-label">비밀번호 변경</div>
        <img className="userinfo-password-button" alt="button" src={RightArrow} />
      </div>
    </div>
  );
}

export default ChangeUserInfo;
