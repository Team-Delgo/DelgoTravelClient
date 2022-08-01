import axios, { AxiosResponse } from 'axios';
import { useErrorHandlers } from './useErrorHandlers';
import { url } from '../../constants/url.cosnt';

async function myAccount(data: { userId: number }, success: (data: AxiosResponse) => void, dispatch: any) {
  await axios
    .get(`${process.env.REACT_APP_API_URL}/myAccount`, {
      params: { userId: data.userId },
    })
    .then((data) => {
      success(data);
    })
    .catch((error) => {
      useErrorHandlers(dispatch, error);
    });
}

async function registCoupon(
  data: { userId: number; couponCode: string },
  success: (data: AxiosResponse) => void,
  dispatch: any,
) {
  await axios
    .post(`${process.env.REACT_APP_API_URL}/coupon/regist`, {
      userId: data.userId,
      couponCode: data.couponCode,
    })
    .then((data) => {
      success(data);
    })
    .catch((error) => {
      useErrorHandlers(dispatch, error);
    });
}

async function changePetInfo(
  data: { email: string; name: string; birthday: string | undefined; size: string },
  success: (data: AxiosResponse) => void,
  dispatch: any,
) {
  const { email, name, birthday, size } = data;
  await axios
    .post(`${process.env.REACT_APP_API_URL}/changePetInfo`, {
      email,
      name,
      birthday,
      size,
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
    .post(`${process.env.REACT_APP_API_URL}/changePassword`, {
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

export { registCoupon, myAccount, changePetInfo, changePassword };
