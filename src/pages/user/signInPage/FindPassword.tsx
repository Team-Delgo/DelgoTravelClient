import React, { ChangeEvent, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AxiosResponse } from "axios";
import { ReactComponent as Arrow } from '../../../icons/left-arrow.svg';
import "./FindPassword.scss";
import { emailAuth } from "../../../common/api/login";
import { SIGN_IN_PATH } from "../../../constants/path.const";

function FindPassword() {
  const [email, setEmail] = useState('');
  const [emailIsSubmitted, setEmailIsSubmitted] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [feedback, setFeedback] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const navigation = useNavigate();

  const inputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setFeedback('');
  };

  const submitEmail = () => {
    emailAuth(email, (response: AxiosResponse) => {

      const { code, data } = response.data;
      if (code === 200) {
        const number = `${data.slice(0, 3)}-${data.slice(3, 7)}-${data.slice(7, 11)}`;
        setPhoneNumber(number);
        setEmailIsSubmitted(true);
      }
      else {
        setFeedback('회원정보를 찾을 수 없습니다.');
        inputRef.current?.focus();
      }
    });
  };

  const nextButtonHandler = () => {
    navigation(SIGN_IN_PATH.PHONEAUTH, { state: { phone: phoneNumber } });
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
            ref={inputRef}
            onChange={inputChangeHandler}
          />
          <div className="login-input-feedback">{feedback}</div>
        </div>
      </div> : <div className="findpassword-selectbox">
        <div className="findpassword-selectbox-circle" />
        <div className="findpassword-selectbox-wrapper">
          <div className="findpassword-selectbox-label">등록된 휴대폰번호로 인증</div>
          <div className="findpassword-selectbox-number">{phoneNumber}</div>
        </div>
      </div>}
      <button type="button" className="login-button active" onClick={emailIsSubmitted ? nextButtonHandler : submitEmail}>
        확인
      </button>
    </div>
  );
};

export default FindPassword;