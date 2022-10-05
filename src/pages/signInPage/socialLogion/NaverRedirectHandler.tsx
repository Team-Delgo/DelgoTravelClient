import React, { useEffect, useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { NAVER } from '../../../common/constants/url.cosnt';
import { userActions } from '../../../redux/slice/userSlice';
import { ROOT_PATH, SIGN_UP_PATH } from '../../../common/constants/path.const';
import { setStateCode } from '../../../common/api/social';
import AlertConfirm from '../../../common/dialog/AlertConfirm';
import AlertConfirmOne from '../../../common/dialog/AlertConfirmOne';
import Loading from '../../../common/utils/Loading';

declare global {
  interface Window {
    Naver: any;
  }
}

function NaverRedirectHandler() {
  const dispatch = useDispatch();
  const code = new URL(window.location.href).searchParams.get('code'); // 네이버 로그인 인증에 성공하면 반환받는 인증 코드, 접근 토큰(access token) 발급에 사용
  const state = new URL(window.location.href).searchParams.get('state');
  const [userData, setUserData] = useState({ phone: '', email: '' });
  const [signUp, setSignUp] = useState(false);
  const [loginFailed, setLoginFailed] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setStateCode(
      { code, state },
      (response: AxiosResponse) => {
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
          setUserData({ phone: data.user.phoneNo, email: data.user.email });
          setSignUp(true);

        } else if (code === 380) {
          console.log('네이버 전화번호 x');
          navigate(SIGN_UP_PATH.SOCIAL.NO_PHONE, { state: { social: '네이버' } });

        } else if (code === 381) {
          console.log('다른 로그인');
          console.log(data.userSocial);
          navigate(SIGN_UP_PATH.SOCIAL.OTHER, { state: { social: data.userSocial, email: data.email } });

        } else {
          console.log('네이버 가입 에러');
          setLoginFailed(true);

        }
      },
      dispatch,
    );
  }, []);

  const moveToPreviousPage = () => {
    navigate('/user/signin');
  };

  const moveToSignUpPage = () => {
    navigate(SIGN_UP_PATH.TERMS, { state: { isSocial: 'N', phone: userData.phone, email: userData.email } });
  };

  return (
    <div>
      <Loading />
      {signUp && (
        <AlertConfirm
          text="네이버로 가입된 계정이 없습니다"
          buttonText="회원가입"
          yesButtonHandler={moveToSignUpPage}
          noButtonHandler={moveToPreviousPage}
        />
      )}
      {loginFailed && <AlertConfirmOne text="네이버 로그인에 실패하였습니다" buttonHandler={moveToPreviousPage} />}
    </div>
  );
}

export default NaverRedirectHandler;
