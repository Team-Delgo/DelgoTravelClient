import React from 'react';

function checkEmail(email: string) {
  const regExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
  if (regExp.test(email) === false) {
    return '올바른 이메일 정보를 입력해 주세요';
  }
  // 중복확인 요청

  return '';
}
function checkPassword(password: string) {
  const check = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  if (check.test(password) === false) {
    return '최소 8자, 최소 하나의 문자 및 하나의 숫자';
  }
  return '';
}
function checkPasswordConfirm(password: string | undefined, confirm: string | undefined) {
  if (password !== confirm) {
    return '패스워드 불일치';
  }
  return '';
}
function checkNickname(nickname:string){
  let check = /[~!@#$%^&*()_+|<>?:{}]/;
  if(check.test(nickname)){
    return '특수문자 포함';
  }
  check = /^.{2,8}$/;
  if(check.test(nickname) === false){
    return '2글자 이상 8글자 이하여야 합니다'
  }
  //  중복확인 요청
  return '';
}

export { checkEmail, checkPassword, checkPasswordConfirm, checkNickname };
