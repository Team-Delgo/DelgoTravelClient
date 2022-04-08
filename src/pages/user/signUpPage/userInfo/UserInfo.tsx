import React, { ChangeEvent, useState } from 'react';
import classNames from 'classnames';
import { AxiosResponse } from 'axios';
import { useNavigate, useLocation, Location } from 'react-router-dom';
import { ReactComponent as Arrow } from '../../../../icons/left-arrow.svg';
import './UserInfo.scss';
import { SIGN_UP_PATH } from '../../../../constants/path.const';
import { checkEmail, checkPassword, checkPasswordConfirm, checkNickname } from './ValidCheck';
import { emailCheck } from '../../../../common/api/signup';

interface LocationState {
  phone: string;
}

interface Input {
  email: string;
  password: string;
  confirm: string;
  nickname: string;
}

enum Id {
  EMAIL = 'email',
  PASSWORD = 'password',
  CONFIRM = 'confirm',
  NICKNAME = 'nickname',
}

function UserInfo() {
  const navigation = useNavigate();
  const state = useLocation().state as LocationState;
  const { phone } = state;
  console.log(state);
  const [nextPage, setNextPage] = useState(false);
  const [enteredInput, setEnteredInput] = useState({ email: '', password: '', confirm: '', nickname: '' });
  const [validInput, setValidInput] = useState({ email: '', password: '', confirm: '', nickname: '' });
  const [feedback, setFeedback] = useState({ email: '', password: '', confirm: '', nickname: '' });
  const [confirmIsTouched, setConfirmIsTouched] = useState(false);
  const [emailDuplicated, setEmailDuplicated] = useState(false);
  const firstPageIsValid = validInput.email.length && validInput.password.length && validInput.confirm.length;

  const emailValidCheck = (value: string) => {
    const response = checkEmail(value);

    if (!response.isValid) {
      setValidInput((prev: Input) => {
        return { ...prev, email: '' };
      });
    } else {
      setValidInput((prev: Input) => {
        return { ...prev, email: value };
      });
    }

    setFeedback((prev: Input) => {
      return { ...prev, email: response.message };
    });
  };

  const passwordValidCheck = (value: string) => {
    const response = checkPassword(value);

    if (!response.isValid) {
      setValidInput((prev: Input) => {
        return { ...prev, password: '' };
      });
    } else {
      setValidInput((prev: Input) => {
        return { ...prev, password: value };
      });
    }

    if (confirmIsTouched && !response.isValid) {
      const { confirm } = enteredInput;
      const check = checkPasswordConfirm(value, confirm);

      setFeedback((prev: Input) => {
        return { ...prev, confirm: check.message };
      });
    }

    setFeedback((prev: Input) => {
      return { ...prev, password: response.message };
    });
  };

  const passwordConfirmValidCheck = (value: string) => {
    const { password } = enteredInput;
    const response = checkPasswordConfirm(password, value);

    if (!response.isValid) {
      setValidInput((prev: Input) => {
        return { ...prev, confirm: '' };
      });
    } else {
      setValidInput((prev: Input) => {
        return { ...prev, confirm: value };
      });
    }
    setFeedback((prev: Input) => {
      return { ...prev, confirm: response.message };
    });
    setConfirmIsTouched(true);
  };

  const nicknameValidCheck = (value: string) => {
    const response = checkNickname(value);

    if (!response.isValid) {
      setValidInput((prev: Input) => {
        return { ...prev, nickname: '' };
      });
    } else {
      setValidInput((prev: Input) => {
        return { ...prev, nickname: value };
      });
    }

    setFeedback((prev: Input) => {
      return { ...prev, nickname: response.message };
    });
  };

  const submitHandler = () => {
    //  유저정보 보내기

    navigation(SIGN_UP_PATH.USER_PET_INFO, {
      state: { email: enteredInput.email, password: enteredInput.password, nickname: enteredInput.nickname, phone },
    });
  };

  const inputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;

    setEnteredInput((prev: Input) => {
      return { ...prev, [id]: value };
    });

    if (id === Id.EMAIL) {
      emailValidCheck(value);
      setEmailDuplicated(false);
    } else if (id === Id.PASSWORD) {
      passwordValidCheck(value);
    } else if (id === Id.CONFIRM) {
      passwordConfirmValidCheck(value);
    } else {
      nicknameValidCheck(value);
    }
  };

  const emailDupCheck = async () => {
    emailCheck(enteredInput.email, (response: AxiosResponse) => {
      const { code } = response.data;
      if (code === 200) {
        setEmailDuplicated(false);
        console.log('not dup');
      } else {
        setEmailDuplicated(true);
      }
    });
  };

  return (
    <div className="login">
      <div
        aria-hidden="true"
        className="login-back"
        onClick={!nextPage ? () => navigation(-1) : () => setNextPage(false)}
      >
        <Arrow />
      </div>
      <header className="login-header">필수 정보 입력</header>
      {!nextPage && (
        <>
          <span className="login-span">이메일</span>
          <div className="login-input-box">
            <input
              className="login-input"
              placeholder="이메일"
              id={Id.EMAIL}
              value={enteredInput.email}
              onChange={inputChangeHandler}
              onBlur={emailDupCheck}
            />
            <p className="input-feedback">{emailDuplicated ? '중복된 이메일 입니다' : feedback.email}</p>
          </div>
          <span className="login-span">비밀번호</span>
          <input
            className="login-input"
            placeholder="영문+숫자 포함 8자리 이상"
            type="password"
            value={enteredInput.password}
            id={Id.PASSWORD}
            onChange={inputChangeHandler}
          />
          <div className="login-input-box">
            <input
              className="login-input"
              placeholder="비밀번호 확인"
              type="password"
              value={enteredInput.confirm}
              id={Id.CONFIRM}
              onChange={inputChangeHandler}
            />
            <p className="input-feedback">{feedback.password.length ? feedback.password : feedback.confirm}</p>
          </div>
          <button
            type="button"
            disabled={!firstPageIsValid}
            className={classNames('login-button', { active: firstPageIsValid })}
            onClick={() => {
              setNextPage(true);
            }}
          >
            다음
          </button>
        </>
      )}
      {nextPage && (
        <>
          <span className="login-span">닉네임</span>
          <div className="login-input-box">
            <input
              className="login-input"
              placeholder="닉네임"
              id={Id.NICKNAME}
              value={enteredInput.nickname}
              onChange={inputChangeHandler}
            />
            <p className="input-feedback">{feedback.nickname}</p>
          </div>
          <button
            type="button"
            disabled={!validInput.nickname.length}
            className={classNames('login-button', { active: validInput.nickname.length })}
            onClick={submitHandler}
          >
            다음
          </button>
        </>
      )}
    </div>
  );
}

export default UserInfo;
