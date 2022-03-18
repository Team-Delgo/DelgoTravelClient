import React, { ChangeEvent, useRef, useState } from 'react';
import classNames from 'classnames';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as Arrow } from '../../../../icons/left-arrow.svg';
import './UserInfo.scss';
import { checkEmail, checkPassword, checkPasswordConfirm, checkNickname } from './ValidCheck';

interface Input {
  email: string;
  password: string;
  confirm: string;
  nickname: string;
}

function UserInfo() {
  const navigation = useNavigate();
  const [next, setNext] = useState(false);
  const [enteredInput, setEnteredInput] = useState({ email: '', password: '', confirm: '', nickname: '' });
  const [validInput, setValidInput] = useState({ email: '', password: '', confirm: '', nickname: '' });
  const [feedback, setFeedback] = useState({ email: '', password: '', confirm: '', nickname: '' });
  const [confirmIsTouched, setConfirmIsTouched] = useState(false);
  const firstPageIsValid = validInput.email.length && validInput.password.length && validInput.confirm.length;

  const emailBlurHanlder = () => {
    const response = checkEmail(enteredInput.email);
    if (response.length) {
      setValidInput((prev: Input) => {
        return { ...prev, email: '' };
      });
    } else {
      setValidInput((prev: Input) => {
        return { ...prev, email: enteredInput.email };
      });
    }
    setFeedback((prev: Input) => {
      return { ...prev, email: response };
    });
  };

  const passwordBlurHandler = () => {
    const response = checkPassword(enteredInput.password);
    if (response.length) {
      setValidInput((prev: Input) => {
        return { ...prev, password: '' };
      });
    } else {
      setValidInput((prev: Input) => {
        return { ...prev, password: enteredInput.password };
      });
    }
    if (confirmIsTouched && !response.length) {
      const { password, confirm } = enteredInput;
      const check = checkPasswordConfirm(password, confirm);
      setFeedback((prev: Input) => {
        return { ...prev, confirm: check };
      });
    }
    setFeedback((prev: Input) => {
      return { ...prev, password: response };
    });
  };

  const passwordConfirmBlurHandler = () => {
    const { password, confirm } = enteredInput;
    const response = checkPasswordConfirm(password, confirm);
    if (response.length) {
      setValidInput((prev: Input) => {
        return { ...prev, confirm: '' };
      });
    } else {
      setValidInput((prev: Input) => {
        return { ...prev, confirm: enteredInput.confirm };
      });
    }
    setFeedback((prev: Input) => {
      return { ...prev, confirm: response };
    });
    setConfirmIsTouched(true);
  };

  const nicknameBlurHandler = () => {
    const response = checkNickname(enteredInput.nickname);
    if (response.length) {
      setValidInput((prev: Input) => {
        return { ...prev, nickname: '' };
      });
    } else {
      setValidInput((prev: Input) => {
        return { ...prev, nickname: enteredInput.nickname };
      });
    }
    setFeedback((prev: Input) => {
      return { ...prev, nickname: response };
    });
  };

  const submitHandler = () => {
    navigation('/');
  };

  const inputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { id } = e.target;
    setEnteredInput((prev: Input) => {
      return { ...prev, [id]: e.target.value };
    });
  };

  return (
    <div className="login">
      <div aria-hidden="true" className="login-back" onClick={!next ? () => navigation(-1) : () => setNext(false)}>
        <Arrow />
      </div>
      <header className="login-header">필수 정보 입력</header>
      {!next && (
        <>
          <span className="login-span">이메일</span>
          <div className="login-input-box">
            <input
              className="login-input"
              placeholder="이메일"
              id="email"
              value={enteredInput.email}
              onChange={inputChangeHandler}
              onBlur={emailBlurHanlder}
            />
            <p className="input-feedback">{feedback.email}</p>
          </div>
          <span className="login-span">비밀번호</span>
          <input
            className="login-input"
            placeholder="영문+숫자 포함 8자리 이상"
            type="password"
            value={enteredInput.password}
            id="password"
            onChange={inputChangeHandler}
            onBlur={passwordBlurHandler}
          />
          <div className="login-input-box">
            <input
              className="login-input"
              placeholder="비밀번호 확인"
              type="password"
              value={enteredInput.confirm}
              id="confirm"
              onChange={inputChangeHandler}
              onBlur={passwordConfirmBlurHandler}
            />
            <p className="input-feedback">{feedback.password.length ? feedback.password : feedback.confirm}</p>
          </div>
          <button
            type="button"
            disabled={!firstPageIsValid}
            className={classNames('login-button', { active: firstPageIsValid })}
            onClick={() => {
              setNext(true);
            }}
          >
            다음
          </button>
        </>
      )}
      {next && (
        <>
          <span className="login-span">닉네임</span>
          <div className="login-input-box">
            <input
              className="login-input"
              placeholder="닉네임"
              id="nickname"
              value={enteredInput.nickname}
              onChange={inputChangeHandler}
              onBlur={nicknameBlurHandler}
            />
            <p className="input-feedback">{feedback.nickname}</p>
          </div>
          <button
            type="button"
            disabled={!validInput.nickname.length}
            className={classNames('login-button', { active: validInput.nickname.length })}
          >
            다음
          </button>
        </>
      )}
    </div>
  );
}

export default UserInfo;
