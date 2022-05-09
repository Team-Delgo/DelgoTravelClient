import React from 'react';

interface Feedback {
  isValid: boolean;
  message: string;
}

function checkEmail(email: string): Feedback {
  const regExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
  if (regExp.test(email) === false) {
    return { isValid: false, message: '올바른 이메일 정보를 입력해 주세요' };
  }
  // 중복확인 요청

  return { isValid: true, message: '' };
}

function checkPassword(password: string): Feedback {
  const check = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  if (check.test(password) === false) {
    return { isValid: false, message: '최소 8자, 최소 하나의 문자 및 하나의 숫자' };
  }

  return { isValid: true, message: '' };
}

function checkPasswordConfirm(password: string | undefined, confirm: string | undefined): Feedback {
  if (password !== confirm) {
    return { isValid: false, message: '비밀번호 불일치' };
  }

  return { isValid: true, message: '' };
}

function checkNickname(nickname: string): Feedback {
  // let check = /[`~!@#$%^&*()_|+\-=?;:'",.<>{}[]\\\/ ]/;
  let check = /^[a-zA-Z가-힣0-9]*$/;
  if (!check.test(nickname)) {
    return { isValid: false, message: '올바르지 않은 입력입니다' };
  }
  check = /^.{2,8}$/;
  if (check.test(nickname) === false) {
    return { isValid: false, message: '2글자 이상 8글자 이하여야 합니다' };
  }
  //  중복확인 요청
  return { isValid: true, message: '' };
}

function checkPetName(name: string): Feedback {
  const check = /[~!@#$%^&*()_+|<>?:{}]/;
  if (check.test(name)) {
    return { isValid: false, message: '특수문자 포함' };
  }
  return { isValid: true, message: '' };
}

export { checkEmail, checkPassword, checkPasswordConfirm, checkNickname, checkPetName };
