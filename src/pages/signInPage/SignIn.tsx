import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import './SignIn.scss';
import { AxiosResponse } from 'axios';
import classNames from 'classnames';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Circles, Grid, Oval, Puff, Rings } from 'react-loader-spinner';
import { ReactComponent as Kakao } from '../../icons/kakao.svg';
import { ReactComponent as Naver } from '../../icons/naver.svg';
import { ReactComponent as Apple } from '../../icons/apple.svg';
import { ROOT_PATH, SIGN_IN_PATH, SIGN_UP_PATH } from '../../constants/path.const';
import { tokenActions } from '../../redux/slice/tokenSlice';
import { KAKAO, NAVER } from '../../constants/url.cosnt';
import Delgo from '../../icons/delgo.svg';
import { checkEmail } from '../signUpPage/userInfo/ValidCheck';
import { emailAuth } from '../../common/api/login';
import Loading from '../../common/utils/Loading';

function SignIn() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(true);
  const [feedback, setFeedback] = useState('');
  const emailRef = useRef<any>();
  const navigation = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(tokenActions.setToken(''));
    localStorage.removeItem('refreshToken');
    setTimeout(() => {
      setLoading(false);
    }, 700);
  }, []);

  const enterKey = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      buttonClickHandler();
    }
  };

  window.addEventListener('keyup', enterKey);

  const inputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setEmail(value);
    const response = checkEmail(value);
    setFeedback(response.message);
  };

  const buttonClickHandler = () => {
    setTimeout(() => {
      emailAuth(
        email,
        (response: AxiosResponse) => {
          const { code } = response.data;
          if (code === 200) {
            navigation(SIGN_IN_PATH.SIGNIN, { state: { email } });
          } else {
            setFeedback('가입되지 않은 이메일입니다.');
          }
        },
        dispatch,
      );
    }, 200);
  };

  return (
    <div className="login-signin">
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className="login-title-wrapper">
            <div className="login-title1">우리집 강아지도</div>
            <div className="login-title2">델고가요</div>
            <div className="login-subtitle">동반 장소를 발견하고 저장하세요</div>
          </div>
          <div className="login-input-flex">
            <div className="login-input-box">
              <input
                placeholder="이메일"
                autoComplete="off"
                onChange={inputChangeHandler}
                value={email}
                ref={emailRef}
                className={classNames('login-input email', { invalid: feedback.length })}
              />
              <p className="login-feedback">{feedback}</p>
            </div>

            <button type="button" className="login-button active signup" onClick={buttonClickHandler}>
              계속
            </button>
            <div className="login-signup-wrapper">
              <div
                aria-hidden="true"
                className="login-signup-text"
                onClick={() => {
                  navigation(ROOT_PATH, { replace: true });
                }}
              >
                가입없이 둘러보기
              </div>
              <div
                aria-hidden="true"
                className="login-signup-text"
                onClick={() => {
                  navigation(SIGN_UP_PATH.TERMS, { state: { isSocial: false } });
                }}
              >
                회원가입
              </div>
            </div>
            <div className="login-social-header">소셜 로그인</div>
            <div className="login-social">
              <a href={KAKAO.KAKAO_AUTH_URL}>
                <button type="button" className="login-kakao">
                  <Kakao className="icon" />
                </button>
              </a>
              <a href={NAVER.NAVER_AUTH_URL}>
                <button type="button" className="login-naver">
                  <Naver className="icon" />
                </button>
              </a>
              <button type="button" className="login-apple">
                <Apple className="icon" />
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default SignIn;
