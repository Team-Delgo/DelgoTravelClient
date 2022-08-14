/* eslint-disable no-undef */
import React, { useEffect } from 'react';
import axios, { AxiosResponse } from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import qs from 'qs';
import { KAKAO } from '../../constants/url.cosnt';
import { tokenActions } from '../../redux/slice/tokenSlice';
import { setAccessCode } from '../api/social';
import { ROOT_PATH, SIGN_UP_PATH } from '../../constants/path.const';
import { userActions } from '../../redux/slice/userSlice';
import Loading from '../../common/utils/Loading';

declare global {
  interface Window {
    Kakao: any;
  }
}

function KakaoRedirectHandler() {
  const dispatch = useDispatch();
  const CLIENT_SECRET = '[본인 CLIENT SECRET 값]';
  const code = new URL(window.location.href).searchParams.get('code');
  const navigate = useNavigate();

  useEffect(() => {
    if (code == null) {
      navigate('/user/signin');
    }
    getAccessToken();
  }, []);

  // const getToken = async () => {
  //   const payload = qs.stringify({
  //     grant_type: "authorization_code",
  //     client_id: KAKAO.REST_API_KEY,
  //     redirect_uri: KAKAO.CALL_BACK_URL,
  //     code,
  //     client_secret: CLIENT_SECRET,
  //   });
  //   try {
  //     const res = await axios.post(
  //       "https://kauth.kakao.com/oauth/token",
  //       payload
  //     );
  //     console.log(res);
  //     window.Kakao.init(KAKAO.REST_API_KEY);
  //     window.Kakao.Auth.setAccessToken(res.data.access_token);

  //     const accessToken = res.data.access_token;
  //     const refreshToken = res.data.refresh_token;
  //     dispatch(
  //       tokenActions.setToken(accessToken),
  //     );
  //     localStorage.setItem('refreshToken', refreshToken);
  //     getProfile()
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  // const getProfile = async () => {
  //   try {
  //     window.Kakao.API.request({
  //       url: '/v2/user/me',
  //       data: {
  //         property_keys: ["kakao_account.phone_number"]
  //       },
  //       success(response: any) {
  //         console.log(response);
  //       },
  //       fail(error: any) {
  //         console.log(error);
  //       }
  //     });
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  const getAccessToken = () => {
    setAccessCode(
      code,
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
          dispatch(tokenActions.setToken(accessToken));
          localStorage.setItem('refreshToken', refreshToken);
          navigate(ROOT_PATH, { replace: true });
        } else if (code === 370) {
          console.log('소셜 회원가입');
          navigate(SIGN_UP_PATH.TERMS, { state: { isSocial: data.userSocial, phone: data.phoneNo, email:data.email } });
        } else if (code === 380) {
          console.log('카카오 전화번호 x');
          navigate(SIGN_UP_PATH.SOCIAL.NO_PHONE, { state: { social: '카카오' } });
        } else if (code === 381) {
          console.log('다른 로그인');
          navigate(SIGN_UP_PATH.SOCIAL.OTHER, { state: { social: data.userSoical, email: data.email } });
        } else {
          console.log('카카오 가입 에러');
        }
      },
      dispatch,
    );
  };

  const KakaoLogOut = () => {
    window.Kakao.API.request({
      url: '/v1/user/unlink',
    });
    navigate('/user/signin');
  };

  return (
    <div>
      <Loading />
    </div>
  );
}

export default KakaoRedirectHandler;
