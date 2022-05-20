/* eslint-disable no-undef */
import React, { useEffect } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import KakaoLogin from "react-kakao-login";
import qs from "qs";
import {REST_API_KEY,REDIRECT_URI} from '../../constants/url.cosnt'
import { tokenActions } from '../../redux/reducers/tokenSlice';


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



  const getToken = async () => {
    const payload = qs.stringify({
      grant_type: "authorization_code",
      client_id: REST_API_KEY,
      redirect_uri: REDIRECT_URI,
      code ,
      client_secret: CLIENT_SECRET,
    });
    try {
      // access token 가져오기
      const res = await axios.post(
        "https://kauth.kakao.com/oauth/token",
        payload
      );
      console.log(res)
      // Kakao Javascript SDK 초기화
      window.Kakao.init(REST_API_KEY);
      // access token 설정
      window.Kakao.Auth.setAccessToken(res.data.access_token);

      const accessToken = res.data.access_token;  
      const refreshToken = res.data.refresh_token;
      dispatch(
        tokenActions.setToken(accessToken),
      );
      localStorage.setItem('refreshToken', refreshToken);
      getProfile()
      // navigate('/');
    } catch (err) {
      console.log(err);
    }
  };

  const getProfile = async () => {
    try {
      window.Kakao.API.request({
        url: '/v2/user/me',
        success(response:any) {
            console.log(response);
        },
        fail(error:any) {
            console.log(error);
        }
    });
    } catch (err) {
      console.log(err);
    }
  };

  const KaKaoLogOut = ()=>{
    window.Kakao.API.request({
      url: '/v1/user/unlink',
    });
  }

  useEffect(() => {
    getToken();
    // KaKaoLogOut()
  }, []);
  return <div>카카오 로그인</div>
  ;
};

export default KakaoRedirectHandler;