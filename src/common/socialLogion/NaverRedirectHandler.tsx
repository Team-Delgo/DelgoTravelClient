import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import qs from 'qs';
import { CLIENT_ID,CLIENT_SECRET, CALLBACK_URL} from '../../constants/url.cosnt';
import { tokenActions } from '../../redux/reducers/tokenSlice';

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

  console.log(code,state)

  useEffect(() => {
    getToken();
  }, []);

  const getToken = async () => {
    const payload = qs.stringify({
      grant_type: "authorization_code",
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      code,
      state,
    });
    try {
      const res = await axios.post(
        "https://nid.naver.com/oauth2.0/token",
         payload
      );
      console.log(res)
    } catch (err) {
      console.log(err);
    }
  };

  const getProfile = async () => {
    try {
      window.Naver.API.request({
        url: 'https://openapi.naver.com/v1/nid/me',
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



  return <div>네이버 로그인</div>
  
};

export default NaverRedirectHandler