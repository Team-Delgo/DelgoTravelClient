import axios, { AxiosResponse } from 'axios';
import { useErrorHandlers } from './useErrorHandlers';
import { url } from '../../constants/url.cosnt';

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

export { registCoupon };
