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
  const startDt = `${data.startDt.substring(0,4)}-${data.startDt.substring(4,6)}-${data.startDt.substring(6,10)}`
  const endDt = `${data.endDt.substring(0,4)}-${data.endDt.substring(4,6)}-${data.endDt.substring(6,10)}`
  try {
    const result = await axios.post(`${url}booking/request`, {
      userId: data.userId,
      placeId: data.placeId,
      roomId: data.roomId,
      couponId: data.couponId,
      point: data.point,
      peopleNum: data.peopleNum,
      petNum: data.petNum,
      startDt,
      endDt
    });
    success(result);
  } catch (error: AxiosError | any) {
    useErrorHandlers(dispatch, error);
  }
}

async function bookingGetData(
  data: {
    accessToken: string;
    bookingId: string;
  },
  success: (data: AxiosResponse) => void,
  dispatch: any,
) {
  try {
    console.log(1)
    const result = await axios.get(`${url}booking/getData?bookingId=${data.bookingId}`,{
      headers: {
        Authorization_Access: `${data.accessToken}`,
      },
    });
    success(result);
  } catch (error: AxiosError | any) {
    useErrorHandlers(dispatch, error);
  }
}

export { bookingRequest, bookingGetData };
