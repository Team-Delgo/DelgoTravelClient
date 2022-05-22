import axios, { AxiosResponse } from 'axios';
import { stringify } from 'querystring';
import { url } from '../../constants/url.cosnt';
import { useErrorHandler } from './useErrorHandler';

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
      useErrorHandler(error);
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
      useErrorHandler(error);
    });
}

async function deleteUser(email: string, success: (data: AxiosResponse) => void) {
  await axios
    .post(`${url}/deleteUser`, {
      user: {
        email,
      },
    })
    .then((data) => {
      success(data);
    })
    .catch((error) => {
      useErrorHandler(error);
    });
}

async function phoneSendMessage(phone: string, success: (data: AxiosResponse) => void, networkError: () => void) {
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
      networkError();
      useErrorHandler(error);
    });
}

async function phoneSendMessageForFind(
  phone: string,
  success: (data: AxiosResponse) => void,
  networkError: () => void,
) {
  await axios
    .get(`${url}/phoneNoAuth`, {
      params: {
        phoneNo: phone,
      },
    })
    .then((data) => {
      success(data);
    })
    .catch((error) => {
      networkError();
      useErrorHandler(error);
    });
}

async function phoneCheckNumber(
  data: { number: string; smsId: number },
  success: (data: AxiosResponse) => void,
  networkError: () => void,
) {
  const { number, smsId } = data;
  await axios
    .get(`${url}/authRandNum`, {
      params: {
        smsId,
        enterNum: number,
      },
    })
    .then((data) => {
      success(data);
    })
    .catch((error) => {
      networkError();
      useErrorHandler(error);
    });
}

async function petImageUpload(formdata: FormData, success: (data: AxiosResponse) => void) {
  await axios
    .post(`${url}/photo/upload/petProfile`, formdata)
    .then((data) => {
      success(data);
    })
    .catch((error) => {
      useErrorHandler(error);
    });
}

export { emailCheck, signup, deleteUser, phoneSendMessageForFind, phoneCheckNumber, phoneSendMessage, petImageUpload };
