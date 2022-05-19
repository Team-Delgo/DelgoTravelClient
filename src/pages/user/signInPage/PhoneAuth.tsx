import React, { useState, useEffect, ChangeEvent } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AxiosResponse } from 'axios';
import classNames from 'classnames';
import { ReactComponent as Arrow } from '../../../icons/left-arrow.svg';
import ToastMessage from '../../../common/components/ToastMessage';
import Timer from '../signUpPage/verifyphone/Timer';
import { phoneSendMessage, phoneCheckNumber } from '../../../common/api/signup';
import { SIGN_IN_PATH } from '../../../constants/path.const';

interface LocationState {
  phone: string;
  email: string;
}

function PhoneAuth() {
  const [timeIsValid, setTimeIsValid] = useState(true);
  const [isReSended, setIsReSended] = useState(false);
  const [buttonIsClicked, setButtonIsClicked] = useState(true);
  const [authNumber, setAuthNumber] = useState('');
  const state = useLocation().state as LocationState;
  const { phone, email } = state;
  const authIsValid = timeIsValid && authNumber.length === 4;
  const navigation = useNavigate();

  useEffect(() => {
    if (buttonIsClicked) {
      authNumberResend();
      setTimeout(() => {
        setButtonIsClicked(false);
      }, 2500);
    }
  }, [buttonIsClicked]);

  const authNumberResend = () => {
    phoneSendMessage(phone, (response: AxiosResponse) => {
      const { code } = response.data;
      console.log(response);
      if (code === 200) {
        setIsReSended(true);
        setButtonIsClicked(true);
        setTimeIsValid(true);
      }
    });
    //  인증번호 전송 요청
  };

  const resetIsResend = () => {
    setIsReSended(false);
  };

  const inputChangeHannler = (e: ChangeEvent<HTMLInputElement>) => {
    setAuthNumber(e.target.value);
  };

  const submitAuthNumber = () => {
    phoneCheckNumber(authNumber, (response: AxiosResponse) => {
      const { code } = response.data;
      if (code === 200) {
        navigation(SIGN_IN_PATH.RESETPASSWORD, { state: email });
      }
    });
  };

  return (
    <div className="login">
      <div aria-hidden="true" className="login-back" onClick={() => navigation(-1)}>
        <Arrow />
      </div>
      <header className="login-header">인증번호 입력</header>
      <div className="login-description">
        등록된 휴대폰 번호로 인증번호가 전송되었습니다.
        <br />
        인증번호를 입력해주세요.
      </div>
      <div className="login-input-box">
        <input className="login-input" placeholder="인증번호" value={authNumber} onChange={inputChangeHannler} />
        <span className="login-timer">
          <Timer isResend={isReSended} resendfunc={resetIsResend} setInValid={() => setTimeIsValid(false)} />
        </span>
        <p aria-hidden="true" className="login-authnumber-resend" onClick={authNumberResend}>
          인증번호 재전송
        </p>
      </div>

      <button
        type="button"
        className={classNames('login-button', { active: authIsValid })}
        disabled={!authIsValid}
        onClick={submitAuthNumber}
      >
        확인
      </button>
    </div>
  );
}

export default PhoneAuth;
