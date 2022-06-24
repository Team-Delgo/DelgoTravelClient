import axios, { AxiosResponse, AxiosError } from 'axios';
import { useErrorHandlers } from './useErrorHandlers';
import { url } from '../../constants/url.cosnt';

async function bookingRequest(
  data: {
    userId: number;
    placeId: number;
    roomId: number;
    couponId: number;
    point: number;
    peopleNum: number;
    petNum: number;
    startDt: string;
    endDt: string;
  },
  success: (data: AxiosResponse) => void,
  dispatch: any,
) {
  try {
    const result = await axios.post(`${url}booking/request`, {
      userId: data.userId,
      placeId: data.placeId,
      rooID: data.roomId,
      couponId: data.couponId,
      point: data.point,
      peopleNum: data.peopleNum,
      petNum: data.petNum,
      startDt: data.startDt,
      endDt: data.endDt,
    });
    success(result);
  } catch (error: AxiosError | any) {
    useErrorHandlers(dispatch, error);
  }
}

async function bookingGetData(
  data: {
    bookingId: string;
  },
  success: (data: AxiosResponse) => void,
  dispatch: any,
) {
  try {
    const result = await axios.get(`${url}booking/request`, {
      params: {
        bookingId: data.bookingId,
      },
    });
    success(result);
  } catch (error: AxiosError | any) {
    useErrorHandlers(dispatch, error);
  }
}

export { bookingRequest, bookingGetData };
