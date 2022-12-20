import { AxiosResponse } from 'axios';
import axiosInstance from './interceptors';
import { useErrorHandlers } from './useErrorHandlers';

async function registCoupon(data: { userId: number; couponCode: string },dispatch: any, success: (data: AxiosResponse) => void) {
  try {
  const result = await axiosInstance.post(
    `/coupon/regist`,
    {
      userId: data.userId,
      couponCode: data.couponCode,
    },
  );
  success(result);
} catch (err: any) {
  useErrorHandlers(dispatch, err);
}
}

async function getCouponList(userId: number) {
  const { data } = await axiosInstance.get(`/coupon/getCouponList?userId=${userId}`);
  return data;
}

export { registCoupon, getCouponList };
