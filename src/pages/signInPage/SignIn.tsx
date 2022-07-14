import React, { useEffect } from 'react';
import './SignIn.scss';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as Kakao } from '../../icons/kakao.svg';
import { ReactComponent as Naver } from '../../icons/naver.svg';
import { ReactComponent as Apple } from '../../icons/apple.svg';
import { SIGN_IN_PATH, SIGN_UP_PATH } from '../../constants/path.const';
import { tokenActions } from '../../redux/slice/tokenSlice';
import { KAKAO, NAVER } from '../../constants/url.cosnt'
import Delgo from "../../icons/delgo.svg";

function SignIn() {
  const navigation = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(tokenActions.setToken(''));
    localStorage.removeItem('refreshToken');
  }, []);

  

  return (
    <div className="login-signin">
      <img className='login-logo' src={Delgo} alt="login-logo"/>
      <div className="login-title">강아지 델고 여행가요</div>
      <a href={KAKAO.KAKAO_AUTH_URL}>
        <button type="button" className="login-kakao">
          <Kakao className="icon" />
          카카오톡 로그인
        </button>
      </a>
      <a href={NAVER.NAVER_AUTH_URL}>
        <button type="button" className="login-naver">
          <Naver className="icon" />
          네이버 로그인
        </button>
      </a>
      <button type="button" className="login-apple">
        <Apple className="icon" />
        애플 로그인
      </button>
      <button
        type="button"
        className="login-button active signup"
        onClick={() => {
          navigation(SIGN_UP_PATH.TERMS);
        }}
      >
        가입하기
      </button>
      <button
        type="button"
        className="login-login"
        onClick={() => {
          navigation(SIGN_IN_PATH.SIGNIN);
        }}
      >
        기존 회원 로그인
      </button>
    </div>
  );
}

export default SignIn;
