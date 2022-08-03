import axios, { AxiosResponse, AxiosError } from 'axios';
import { useErrorHandlers } from './useErrorHandlers';

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

async function getCouponList(userId: number) {
  const {data} = await axios
  .get(`${process.env.REACT_APP_API_URL}/coupon/getCouponList?userId=${userId}`)
  return data
}

export { registCoupon , getCouponList};