import React, { ChangeEvent, useState, useEffect, useRef } from 'react';
import classNames from 'classnames';
import { useDispatch } from 'react-redux';
import { AxiosResponse } from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import { ReactComponent as Arrow } from '../../../icons/left-arrow.svg';
import './UserInfo.scss';
import { SIGN_UP_PATH } from '../../../constants/path.const';
import { checkEmail, checkPassword, checkPasswordConfirm, checkNickname } from './ValidCheck';
import { emailCheck, nicknameCheck } from '../../../common/api/signup';
import Check from '../../../icons/check.svg';

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
  const dispatch = useDispatch();
  const state = useLocation().state as LocationState;
  const { phone } = state;
  const [nextPage, setNextPage] = useState(false);
  const [enteredInput, setEnteredInput] = useState({ email: '', password: '', confirm: '', nickname: '' });
  const [validInput, setValidInput] = useState({ email: '', password: '', confirm: '', nickname: '' });
  const [feedback, setFeedback] = useState({ email: '', password: '', confirm: '', nickname: '' });
  const [confirmIsTouched, setConfirmIsTouched] = useState(false);
  const [emailDuplicated, setEmailDuplicated] = useState(true);
  const [emailDupCheckFail, setEmailDupCheckFail] = useState(false);
  const [nicknameDuplicated, setNicknameDuplicated] = useState(true);
  const [nicknameDupCheckFail, setNicknameDupCheckFail] = useState(false);
  const emailRef = useRef<any>();
  const nicknameRef = useRef<any>();
  const firstPageIsValid =
    validInput.email.length && validInput.password.length && validInput.confirm.length && !emailDuplicated;
  console.log(validInput);

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
    if (enteredInput.confirm.length) {
      const { confirm } = enteredInput;
      const check = checkPasswordConfirm(value, confirm);
      setFeedback((prev: Input) => {
        return { ...prev, confirm: check.message };
      });
      if (!check.isValid) {
        console.log('aa');
        setValidInput((prev: Input) => {
          return { ...prev, confirm: '' };
        });
      } else {
        setValidInput((prev: Input) => {
          return { ...prev, confirm: value };
        });
      }
    }
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
    setTimeout(() => {
      navigation(SIGN_UP_PATH.USER_PET_INFO, {
        state: {
          email: enteredInput.email,
          password: enteredInput.password,
          nickname: enteredInput.nickname,
          phone,
          isSocial: false,
        },
      });
    }, 200);
  };

  const inputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;

    setEnteredInput((prev: Input) => {
      return { ...prev, [id]: value };
    });

    if (id === Id.EMAIL) {
      emailValidCheck(value);
      setEmailDuplicated(true);
      setEmailDupCheckFail(false);
    } else if (id === Id.PASSWORD) {
      passwordValidCheck(value);
    } else if (id === Id.CONFIRM) {
      passwordConfirmValidCheck(value);
    } else {
      nicknameValidCheck(value);
      setNicknameDuplicated(true);
      setNicknameDupCheckFail(false);
    }
  };

  const emailDupCheck = async () => {
    if (validInput.email) {
      emailCheck(
        enteredInput.email,
        (response: AxiosResponse) => {
          const { code } = response.data;
          if (code === 200) {
            setEmailDuplicated(false);
            setEmailDupCheckFail(false);
          } else {
            setEmailDuplicated(true);
            setEmailDupCheckFail(true);
            emailRef.current.focus();
          }
        },
        dispatch,
      );
    }
  };

  const nicknameDupCheck = () => {
    nicknameCheck(
      enteredInput.nickname,
      (response: AxiosResponse) => {
        const { code } = response.data;
        if (code === 200) {
          setNicknameDuplicated(false);
          setNicknameDupCheckFail(false);
        } else {
          setNicknameDuplicated(true);
          setNicknameDupCheckFail(true);
          nicknameRef.current.focus();
        }
      },
      dispatch,
    );
  };

  return (
    <div className="login">
      <div
        aria-hidden="true"
        className="login-back"
        onClick={
          !nextPage
            ? () => {
                setTimeout(() => {
                  navigation(-1);
                }, 200);
              }
            : () => setNextPage(false)
        }
      >
        <Arrow />
      </div>
      <header className="login-header">필수 정보 입력</header>
      {!nextPage && (
        <>
          <span className="login-span">이메일</span>
          <div className="login-input-box">
            <input
              className={classNames('login-input email', { invalid: feedback.email || emailDupCheckFail })}
              placeholder="이메일"
              id={Id.EMAIL}
              value={enteredInput.email}
              autoComplete="false"
              onChange={inputChangeHandler}
              ref={emailRef}
            />
            {!emailDuplicated && validInput.email && (
              <span className={classNames('login-input-clear', { checked: !emailDuplicated })}>
                <img src={Check} alt="check" />
              </span>
            )}
            <p className={classNames('input-feedback', { fine: !emailDuplicated && validInput.email.length })}>
              {emailDupCheckFail ? '이미 사용중인 이메일입니다.' : feedback.email}
            </p>

            <span aria-hidden="true" className="input-email-check" onClick={emailDupCheck}>
              중복확인
            </span>
          </div>
          <span className="login-span">비밀번호</span>
          <input
            className={classNames('login-input password', { invalid: feedback.password.length })}
            placeholder="비밀번호 최소 8자이상 (문자, 숫자 조합)"
            type="password"
            value={enteredInput.password}
            autoComplete="false"
            id={Id.PASSWORD}
            onChange={inputChangeHandler}
          />
          <div className="login-input-box">
            <input
              className={classNames('login-input bitmargin password', { invalid: feedback.confirm.length })}
              placeholder="비밀번호 확인"
              type="password"
              value={enteredInput.confirm}
              autoComplete="off"
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
              className={classNames('login-input email', {
                invalid: feedback.nickname || nicknameDupCheckFail,
              })}
              placeholder="닉네임(공백, 특수문자 제외)"
              id={Id.NICKNAME}
              value={enteredInput.nickname}
              autoComplete="off"
              onChange={inputChangeHandler}
              ref={nicknameRef}
            />
            {!nicknameDuplicated && validInput.nickname && (
              <span className={classNames('login-input-clear', { checked: !nicknameDuplicated })}>
                <img src={Check} alt="check" />
              </span>
            )}
            <p className={classNames('input-feedback', { fine: !nicknameDuplicated && validInput.nickname.length })}>
              {nicknameDupCheckFail ? '이미 사용중인 닉네임입니다.' : feedback.nickname}
            </p>
            <span aria-hidden="true" className="input-email-check" onClick={nicknameDupCheck}>
              중복확인
            </span>
          </div>
          <button
            type="button"
            disabled={!validInput.nickname.length || nicknameDuplicated}
            className={classNames('login-button', { active: validInput.nickname.length && !nicknameDuplicated })}
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
