import axios, { AxiosResponse } from 'axios';
import { errorHandler } from './errorHandler';
import { url } from '../../constants/url.cosnt';

async function login(data: { email: string; password: string }, success: (data: AxiosResponse) => void) {
  await axios
    .post(`${url}login`, {
      email: data.email,
      password: data.password,
    })
    .then((data) => {
      success(data);
    })
    .catch((error) => {
      errorHandler(error);
    });
}

async function tokenRefresh(data: { refreshToken: string }, success: (data: AxiosResponse) => void) {
  await axios
    .get(`${url}tokenReissue`, {
      headers: {
        Authorization_Refresh: `${data.refreshToken}`,
      },
    })
    .then((data) => {
      success(data);
    })
    .catch((error) => {
      errorHandler(error);
    });
}

async function emailAuth(email: string, success: (data: AxiosResponse) => void) {
  await axios
    .get(`${url}/emailAuth`, {
      params: { email },
    })
    .then((data) => {
      success(data);
    })
    .catch((error) => {
      errorHandler(error);
    });
}

export { login, tokenRefresh, emailAuth };
