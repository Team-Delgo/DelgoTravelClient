import axios, { AxiosResponse, AxiosError } from 'axios';
import { useErrorHandlers } from './useErrorHandlers';
import { url } from '../../constants/url.cosnt';


async function getCouponList(
    userId: number,
    success: (data: AxiosResponse) => void,
    dispatch: any,
  ) {
    try {
      const result = await axios.get(`${process.env.REACT_APP_API_URL}/coupon/getCouponList?userId=${userId}`);
      success(result);
    } catch (error: AxiosError | any) {
      useErrorHandlers(dispatch, error);
    }
  }

  async function getCouponList2(userId: number) {
    const result = axios.get(`${process.env.REACT_APP_API_URL}/coupon/getCouponList?userId=${userId}`)
    console.log(result)
    // return data
  }
  
  export { getCouponList};