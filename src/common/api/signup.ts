import axios, { AxiosResponse } from 'axios';
import { url } from '../../constants/url.cosnt';
import { errorHandler } from './errorHandler';

interface SignUpData {
  email: string;
  password: string;
  nickname: string;
  phone: string;
  pet: { name: string; birthday: string | undefined; size: string; weight: string };
}

async function emailCheck(email: string, success: (data: AxiosResponse) => void) {
  await axios
    .get(`${url}/emailCheck`, {
      params: { email },
    })
    .then((data) => {
      success(data);
    })
    .catch((error) => {
      errorHandler(error);
    });
}

async function signup(info: SignUpData, success: (data: AxiosResponse) => void) {
  const { nickname, email, password, phone, pet } = info;
  await axios
    .post(`${url}/signup`, {
      user: {
        name: nickname,
        email,
        password,
        phoneNo: phone,
      },
      pet,
    })
    .then((data) => {
      success(data);
    })
    .catch((error) => {
      errorHandler(error);
    });
}

async function phoneSendMessage(phone: string, success: (data: AxiosResponse) => void) {
  await axios
    .get(`${url}/phoneNoCheck`, {
      params: {
        phoneNo: phone,
      },
    })
    .then((data) => {
      success(data);
    })
    .catch((error) => {
      errorHandler(error);
    });
}

async function phoneCheckNumber(number: string, success: (data: AxiosResponse) => void) {
  await axios
    .get(`${url}/authRandNum`, {
      params: {
        enterNum: number,
      },
    })
    .then((data) => {
      success(data);
    })
    .catch((error) => {
      errorHandler(error);
    });
}

export { emailCheck, signup, phoneCheckNumber, phoneSendMessage };
