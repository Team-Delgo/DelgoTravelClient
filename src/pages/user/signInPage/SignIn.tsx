import React from 'react';
import './SignIn.scss';
import { useNavigate } from 'react-router-dom';

function SignIn() {
  const navigation = useNavigate();
  return <div className="login">
    <div className='login-title'>Delgo 가요</div>
    <button type='button' className="login-kakao">카카오톡으로 로그인</button>
    <button type='button' className="login-naver">네이버로 로그인</button>
    <button type='button' className="login-apple">애플로 로그인</button>
    <button type='button' className='login-button active signup' onClick={()=>{navigation('/user/signup/terms')}}>가입하기</button>
  </div>;
}

export default SignIn;
