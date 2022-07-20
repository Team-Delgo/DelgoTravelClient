import axios, { AxiosResponse } from 'axios';
import { useErrorHandler } from './useErrorHandler';
import { useErrorHandlers } from './useErrorHandlers';
import { url } from '../../constants/url.cosnt';

async function login(data: { email: string; password: string }, success: (data: AxiosResponse) => void, dispatch: any) {
  await axios
    .post(`${url}login`, {
      email: data.email,
      password: data.password,
    })
    .then((data) => {
      success(data);
    })
    .catch((error) => {
      useErrorHandlers(dispatch, error);
    });
}

async function tokenRefresh(data: { refreshToken: string }, success: (data: AxiosResponse) => void, dispatch: any) {
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
      useErrorHandlers(dispatch, error);
    });
}

async function emailAuth(email: string, success: (data: AxiosResponse) => void, dispatch: any) {
  await axios
    .get(`${url}emailAuth`, {
      params: { email },
    })
    .then((data) => {
      success(data);
    })
    .catch((error) => {
      useErrorHandlers(dispatch, error);
    });
}

async function changePassword(email: string, password: string, success: (data: AxiosResponse) => void, dispatch: any) {
  await axios
    .post(`${url}resetPassword`, {
        email,
        newPassword: password,
    })
    .then((data) => {
      success(data);
    })
    .catch((error) => {
      useErrorHandlers(dispatch, error);
    });
}

export { login, tokenRefresh, emailAuth, changePassword };
