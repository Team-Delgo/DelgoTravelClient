/* eslint-disable no-undef */
import React, { useEffect } from "react";
import axios, { AxiosResponse } from 'axios';
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import qs from "qs";
import { KAKAO } from '../../constants/url.cosnt'
import { tokenActions } from '../../redux/slice/tokenSlice';
import { setAccessCode } from "../api/social";


declare global {
  interface Window {
    Kakao: any;
  }
}

function KakaoRedirectHandler() {
  const dispatch = useDispatch();
  const CLIENT_SECRET = "[본인 CLIENT SECRET 값]";
  const code = new URL(window.location.href).searchParams.get("code");
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
    setAccessCode(code,(response:AxiosResponse)=>{
      console.log(response);
    },dispatch);
  };

  const KakaoLogOut = () => {
    window.Kakao.API.request({
      url: '/v1/user/unlink',
    });
    navigate('/user/signin')
  }

  return <div>
    카카오 로그인
    <button type="button" onClick={KakaoLogOut}> 로그아웃</button>
  </div>
    ;
};

export default KakaoRedirectHandler;