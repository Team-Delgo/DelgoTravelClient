import axios, { AxiosResponse } from 'axios';
import { useErrorHandlers } from './useErrorHandlers';
import { url } from '../../constants/url.cosnt';

async function myAccount(data: { userId: number }, success: (data: AxiosResponse) => void, dispatch: any) {
  await axios
    .get(`${url}myAccount`, {
      params: { userId:data.userId },
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
    .post(`${url}coupon/regist`, {
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

// async function changePetInfo(){
//   await axios.post(`${url}socialSign`,{
    
//   })
// }

export { registCoupon, myAccount };
