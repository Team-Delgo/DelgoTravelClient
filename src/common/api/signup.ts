import axios, { AxiosResponse } from 'axios';
import { url } from '../../constants/url.cosnt';
import { errorHandler } from './errorHandler';

interface SignUpData {
  email: string;
  password: string;
  nickname: string;
  phone: string;
  pet: { petName: string; petBirth: string | undefined; petImage: ArrayBuffer; petType: string };
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
    .post(`${url}/auth/signup`, {
      name: nickname,
      email,
      password,
      phone_no: phone,
      pets: pet,
    })
    .then((data) => {
      success(data);
    })
    .catch((error) => {
      errorHandler(error);
    });
}

export { emailCheck, signup };
