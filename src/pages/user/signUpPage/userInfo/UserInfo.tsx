import React, { useRef, useState } from 'react';
import classNames from 'classnames';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as Arrow } from '../../../../icons/left-arrow.svg';
import './UserInfo.scss';
import { checkEmail, checkPassword, checkPasswordConfirm, checkNickname } from './ValidCheck';

function UserInfo() {
  const navigation = useNavigate();
  const [next, setNext] = useState(false);
  const [validEmail, setValidEmail] = useState<string>();
  const [emailFeedback, setEmailFeedback] = useState<string>();
  const [validPassword, setValidPassword] = useState<string>();
  const [passwordFeedback, setPasswordFeedback] = useState<string>();
  const [confirmIsValid, setConfirmIsValid] = useState(false);
  const [confirmFeedback, setConfirmFeedback] = useState<string>();
  const [confirmIsTouched, setConfirmIsTouched] = useState(false);
  const [validNickname, setValidNickname] = useState<string>();
  const [nicknameFeedback, setNicknameFeedback] = useState<string>();
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const passwordConfirmRef = useRef<HTMLInputElement>(null);
  const nicknameRef = useRef<HTMLInputElement>(null);
  const firstPageIsValid = validEmail?.length && validPassword?.length && confirmIsValid;
  const emailBlurHanlder = () => {
    const response = checkEmail(emailRef.current!.value);
    if (response.length) {
      setValidEmail('');
    } else {
      setValidEmail(emailRef.current!.value);
    }
    setEmailFeedback(response);
  };
  const passwordBlurHandler = () => {
    const response = checkPassword(passwordRef.current!.value);
    if (response.length) {
      setValidPassword('');
    } else {
      setValidPassword(passwordRef.current!.value);
    }
    if (confirmIsTouched && !response.length) {
      const password = passwordRef.current?.value;
      const passwordConfirm = passwordConfirmRef.current?.value;
      const confirm = checkPasswordConfirm(password, passwordConfirm);
      setConfirmFeedback(confirm);
    }
    setPasswordFeedback(response);
  };
  const passwordConfirmBlurHandler = () => {
    const password = passwordRef.current?.value;
    const passwordConfirm = passwordConfirmRef.current?.value;
    const response = checkPasswordConfirm(password, passwordConfirm);
    if (response.length) {
      setConfirmIsValid(false);
    } else {
      setConfirmIsValid(true);
    }
    setConfirmFeedback(response);
    setConfirmIsTouched(true);
  };
  const nicknameBlurHandler = () => {
    console.log(1);
  };
  return (
    <div className="login">
      <div aria-hidden="true" className="login-back" onClick={() => navigation(-1)}>
        <Arrow />
      </div>
      <header className="login-header">필수 정보 입력</header>
      {!next && (
        <>
          <span className="login-span">이메일</span>
          <div className="login-input-box">
            <input className="login-input" placeholder="이메일" onBlur={emailBlurHanlder} ref={emailRef} />
            <p className="input-feedback">{emailFeedback}</p>
          </div>
          <span className="login-span">비밀번호</span>
          <input
            className="login-input"
            placeholder="영문+숫자 포함 8자리 이상"
            type="password"
            onBlur={passwordBlurHandler}
            ref={passwordRef}
          />
          <div className="login-input-box">
            <input
              className="login-input"
              placeholder="비밀번호 확인"
              type="password"
              onBlur={passwordConfirmBlurHandler}
              ref={passwordConfirmRef}
            />
            <p className="input-feedback">{passwordFeedback?.length ? passwordFeedback : confirmFeedback}</p>
          </div>
          <button
            type="button"
            disabled={!firstPageIsValid}
            className={classNames('login-button',{active:firstPageIsValid})}
          >
            다음
          </button>
        </>
      )}
      {next && (
        <>
          <span className="login-span">이메일</span>
          <div className="login-input-box">
            <input className="login-input" placeholder="닉네임" onBlur={nicknameBlurHandler} ref={nicknameRef} />
            <p className="input-feedback">{emailFeedback}</p>
          </div>
          <button
            type="button"
            disabled={!firstPageIsValid}
            className={classNames('login-button',{active:firstPageIsValid})}
          >
            다음
          </button>
        </>
      )}
    </div>
  );
}
export default UserInfo;
