import React, { useEffect } from 'react';
import axios, { AxiosResponse } from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import qs from 'qs';
import { NAVER } from '../../../common/constants/url.cosnt';
import { userActions } from '../../../redux/slice/userSlice';
import { ROOT_PATH, SIGN_UP_PATH } from '../../../common/constants/path.const';
import { setStateCode } from '../../../common/api/social';

declare global {
  interface Window {
    Naver: any;
  }
}


function NaverRedirectHandler() {
  const dispatch = useDispatch();
  const code = new URL(window.location.href).searchParams.get("code"); // 네이버 로그인 인증에 성공하면 반환받는 인증 코드, 접근 토큰(access token) 발급에 사용
  const state = new URL(window.location.href).searchParams.get("state");
  const navigate = useNavigate();


  useEffect(() => {
    setStateCode({ code, state }, (response: AxiosResponse) => {
      console.log(response);
      const { code, data } = response.data;
      if (code === 200) {
        console.log('로그인 성공');
        dispatch(
          userActions.signin({
            isSignIn: true,
            couponList: data.couponList,
            user: {
              id: data.user.userId,
              nickname: data.user.name,
              email: data.user.email,
              phone: data.user.phoneNo,
              userSocial: data.user.userSocial,
            },
            pet: {
              petId: data.pet.petId,
              birthday: data.pet.birthday,
              size: data.pet.size,
              name: data.pet.name,
              image: data.user.profile,
            },
          }),
        );
        const accessToken = response.headers.authorization_access;
        const refreshToken = response.headers.authorization_refresh;
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
        navigate(ROOT_PATH, { replace: true });
      } else if (code === 370) {
        console.log('소셜 회원가입');
        navigate(SIGN_UP_PATH.TERMS, { state: { isSocial: 'K', phone: data.phoneNo, email: data.email } });
      } else if (code === 380) {
        console.log('네이버 전화번호 x');
        navigate(SIGN_UP_PATH.SOCIAL.NO_PHONE, { state: { social: '카카오' } });
      } else if (code === 381) {
        console.log('다른 로그인');
        navigate(SIGN_UP_PATH.SOCIAL.OTHER, { state: { social: data.userSoical, email: data.email } });
      } else {
        console.log('네이버 가입 에러');
      }
    }, dispatch);
  }, []);
    
  const moveToPreviousPage = () => {
    navigate('/user/signin')
  }


  return <div>네이버 로그인
    <button type="button" onClick={moveToPreviousPage}>뒤로가기</button>
  </div>
}

export default NaverRedirectHandler