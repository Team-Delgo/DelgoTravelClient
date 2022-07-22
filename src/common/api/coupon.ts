import axios, { AxiosResponse, AxiosError } from 'axios';
import { useErrorHandlers } from './useErrorHandlers';
import { url } from '../../constants/url.cosnt';


async function getCouponList(
    userId: number,
    success: (data: AxiosResponse) => void,
    dispatch: any,
  ) {
    try {
      const result = await axios.get(`${url}coupon/getCouponList?userId=${userId}`);
      success(result);
    } catch (error: AxiosError | any) {
      useErrorHandlers(dispatch, error);
    }
  }
  
  export { getCouponList};