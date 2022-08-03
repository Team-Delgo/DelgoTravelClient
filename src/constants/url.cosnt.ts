/* eslint-disable no-template-curly-in-string */

export const KAKAO = {
  // REST_API_KEY : "ed29d568272e3eb51b493659e2d6e9eb",
  REST_API_KEY: 'b40f84b68ce44634317bb5530b0166c1',
  CALL_BACK_URL: `${process.env.REACT_APP_BASE_URL}/oauth/callback/kakao`,
  // CALL_BACK_URL: `https://delgo.pet/oauth/callback/kakao`,
  KAKAO_AUTH_URL: `https://kauth.kakao.com/oauth/authorize?client_id=b40f84b68ce44634317bb5530b0166c1&redirect_uri=${process.env.REACT_APP_BASE_URL}/oauth/callback/kakao&response_type=code`,
};

export const NAVER = {
  CLIENT_ID: 'AsoX91fTgAHzXvMW9Mik',
  CLIENT_SECRET: 'sLk3D0NqzW',
  STATE_STRING: '9kgsGTfH4j7IyAkg',
  CALL_BACK_URL: `${process.env.REACT_APP_BASE_URL}/oauth/callback/naver`,
  NAVER_AUTH_URL: `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=AsoX91fTgAHzXvMW9Mik&state=9kgsGTfH4j7IyAkg&redirect_uri=${process.env.REACT_APP_BASE_URL}/oauth/callback/naver`,
};

export const TOSS = {
  CLIENT_KEY: 'test_ck_XLkKEypNArWzAYzmpbjVlmeaxYG5',
  SECRET_KEY: 'test_sk_5mBZ1gQ4YVXzygzAM0a8l2KPoqNb',
};
