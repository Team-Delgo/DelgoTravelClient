/* eslint-disable no-template-curly-in-string */
export const url = 'http://49.50.161.156/';


export const REST_API_KEY = "ed29d568272e3eb51b493659e2d6e9eb";
export const REDIRECT_URI = "http://localhost:3000/oauth/callback/kakao";
export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;


export const CLIENT_ID = "AsoX91fTgAHzXvMW9Mik";
export const CLIENT_SECRET = "sLk3D0NqzW";
export const STATE_STRING = "9kgsGTfH4j7IyAkg";
export const CALLBACK_URL = "http://localhost:3000/oauth/callback/naver";
export const NAVER_AUTH_URL = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${CLIENT_ID}&state=${STATE_STRING}&redirect_uri=${CALLBACK_URL}`;
