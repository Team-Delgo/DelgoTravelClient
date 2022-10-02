import { AxiosResponse } from 'axios';
import axiosInstance from './interceptors';
import { useErrorHandlers } from './useErrorHandlers';

async function registCoupon(data: { userId: number; couponCode: string },dispatch: any, success: (data: AxiosResponse) => void) {
  try {
  const accessToken = localStorage.getItem('accessToken') || '';
  const result = await axiosInstance.post(
    `/coupon/regist`,
    {
      userId: data.userId,
      couponCode: data.couponCode,
    },
    {
      headers: {
        Authorization_Access: accessToken,
      },
    },
  );
  success(result);
} catch (err: any) {
  useErrorHandlers(dispatch, err);
}
}

async function getCouponList(userId: number) {
  const accessToken = localStorage.getItem('accessToken') || '';
  const { data } = await axiosInstance.get(`/coupon/getCouponList?userId=${userId}`, {
    headers: {
      Authorization_Access: accessToken,
    },
  });
  return data;
}

export { registCoupon, getCouponList };
