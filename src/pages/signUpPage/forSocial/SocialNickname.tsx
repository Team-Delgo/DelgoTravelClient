import React, { ChangeEvent, useState, useRef } from 'react';
import classNames from 'classnames';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { AxiosResponse } from 'axios';
import Check from '../../../common/icons/check.svg';
import { ReactComponent as Arrow } from '../../../common/icons/left-arrow.svg';
import { checkNickname } from '../userInfo/ValidCheck';
import { nicknameCheck } from '../../../common/api/signup';
import { SIGN_UP_PATH } from '../../../common/constants/path.const';

interface LocationState {
  phone: string;
  isSocial: string;
  email: string;
}

function SocialNickname() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const state = useLocation().state as LocationState;
  const { isSocial, phone, email } = state;
  const [enteredInput, setEnteredInput] = useState('');
  const [validInput, setValidInput] = useState('');
  const [feedback, setFeedback] = useState('');
  const [nicknameDuplicated, setNicknameDuplicated] = useState(true);
  const [nicknameDupCheckFail, setNicknameDupCheckFail] = useState(false);
  const nicknameRef = useRef<HTMLInputElement>(null);

  const nicknameValidCheck = (value: string) => {
    const response = checkNickname(value);

    if (!response.isValid) {
      setValidInput('');
    } else {
      setValidInput(value);
    }

    setFeedback(response.message);
  };

  const inputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setEnteredInput(value);
    nicknameValidCheck(value);
    setNicknameDuplicated(true);
    setNicknameDupCheckFail(false);
  };

  const submitHandler = () => {
    //  유저정보 보내기

    navigate(SIGN_UP_PATH.USER_PET_INFO, {
      state: { email, password:'', nickname: enteredInput, phone, isSocial },
    });
  };

  const nicknameDupCheck = () => {
    nicknameCheck(
      enteredInput,
      (response: AxiosResponse) => {
        const { code } = response.data;
        if (code === 200) {
          setNicknameDuplicated(false);
          setNicknameDupCheckFail(false);
        } else {
          setNicknameDuplicated(true);
          setNicknameDupCheckFail(true);
          if(nicknameRef.current){
            nicknameRef.current.focus();
          }
        }
      },
      dispatch,
    );
  };

  return (
    <div className="login">
      <div aria-hidden="true" className="login-back" onClick={() => navigate(-1)}>
        <Arrow />
      </div>
      <header className="login-header">필수 정보 입력</header>

      <span className="login-span">닉네임</span>
      <div className="login-input-box">
        <input
          className={classNames('login-input email', {
            invalid: feedback || nicknameDupCheckFail,
          })}
          placeholder="닉네임(공백, 특수문자 제외)"
          value={enteredInput}
          autoComplete="off"
          onChange={inputChangeHandler}
          ref={nicknameRef}
        />
        {!nicknameDuplicated && validInput && (
          <span className={classNames('login-input-clear', { checked: !nicknameDuplicated })}>
            <img src={Check} alt="check" />
          </span>
        )}
        <p className={classNames('input-feedback', { fine: !nicknameDuplicated && validInput.length })}>
          {nicknameDupCheckFail ? '이미 사용중인 닉네임입니다.' : feedback}
        </p>
        <span aria-hidden="true" className="input-email-check" onClick={nicknameDupCheck}>
          중복확인
        </span>
      </div>
      <button
        type="button"
        disabled={!validInput.length || nicknameDuplicated}
        className={classNames('login-button', { active: validInput.length && !nicknameDuplicated })}
        onClick={submitHandler}
      >
        다음
      </button>
    </div>
  );
}

export default SocialNickname;
