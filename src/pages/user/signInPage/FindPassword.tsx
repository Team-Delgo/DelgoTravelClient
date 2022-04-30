import React, { ChangeEvent, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ReactComponent as Arrow } from '../../../icons/left-arrow.svg';
import "./FindPassword.scss";

function FindPassword() {
  const [email, setEmail] = useState('');
  const [emailIsSubmitted, setEmailIsSubmitted] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const navigation = useNavigate();

  const inputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const submitEmail = () => {
    // axios
    setEmailIsSubmitted(true);
  };

  return (
    <div className="login">
      <div aria-hidden="true" className="login-back" onClick={() => navigation(-1)}>
        <Arrow />
      </div>
      <header className="login-header">비밀번호 재설정</header>
      {!emailIsSubmitted ? <div>
        <div className="login-description">회원가입 시 등록한 이메일을 입력해 주세요</div>
        <div className="login-input-box">
          <input
            className="login-input"
            placeholder="이메일"
            value={email}
            onChange={inputChangeHandler}
          />
        </div>
      </div> : <div className="findpassword-selectbox">
        <div className="findpassword-selectbox-circle" />
        <div className="findpassword-selectbox-wrapper">
          <div className="findpassword-selectbox-label">등록된 휴대폰번호로 인증</div>
          <div className="findpassword-selectbox-number">010-0000-0000</div>
        </div>
      </div>}

      <button type="button" className="login-button active" onClick={submitEmail}>
        확인
      </button>
    </div>
  );
};

export default FindPassword;