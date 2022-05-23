/* eslint-disable no-template-curly-in-string */
export const url = 'http://49.50.161.156/';

export const KAKAO = {
    REST_API_KEY : "ed29d568272e3eb51b493659e2d6e9eb",
    REDIRECT_URI : "http://localhost:3000/oauth/callback/kakao",
    KAKAO_AUTH_URL : `https://kauth.kakao.com/oauth/authorize?client_id=ed29d568272e3eb51b493659e2d6e9eb&redirect_uri=http://localhost:3000/oauth/callback/kakao&response_type=code`
}

export const NAVER = {
    CLIENT_ID : "AsoX91fTgAHzXvMW9Mik",
    CLIENT_SECRET : "sLk3D0NqzW",
    STATE_STRING : "9kgsGTfH4j7IyAkg",
    CALLBACK_URL : "http://localhost:3000/oauth/callback/naver",
    NAVER_AUTH_URL : `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=AsoX91fTgAHzXvMW9Mik&state=9kgsGTfH4j7IyAkg&redirect_uri=http://localhost:3000/oauth/callback/naver`
}





