import axios, { AxiosResponse, AxiosError } from 'axios';
import { useErrorHandlers } from './useErrorHandlers';

async function bookingRequest(
  data: {
    userId: number;
    placeId: number;
    roomId: number;
    couponId: number;
    reservedName: string;
    point: number;
    startDt: string;
    endDt: string;
    orderId:string|null;
    paymentKey:string|null;
  },
  success: (data: AxiosResponse) => void,
  dispatch: any,
) {
  const startDt = `${data.startDt.substring(0,4)}-${data.startDt.substring(4,6)}-${data.startDt.substring(6,10)}`
  const endDt = `${data.endDt.substring(0,4)}-${data.endDt.substring(4,6)}-${data.endDt.substring(6,10)}`
  try {
    const result = await axios.post(`${process.env.REACT_APP_API_URL}/booking/request`, {
      userId: data.userId,
      placeId: data.placeId,
      roomId: data.roomId,
      couponId: data.couponId,
      reservedName:data.reservedName,
      point: data.point,
      startDt,
      endDt,
      orderId:data.orderId,
      paymentKey:data.paymentKey
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
    const result = await axios.get(`${process.env.REACT_APP_API_URL}/booking/getData?bookingId=${data.bookingId}`,{
      // headers: {
      //   Authorization_Access: `${data.accessToken}`,
      // },
    });
    success(result);
  } catch (error: AxiosError | any) {
    useErrorHandlers(dispatch, error);
  }
}


async function bookingGetDataByMain(accessToken: string, userId: number) {
  const {data} = await axios
  .get(`${process.env.REACT_APP_API_URL}/booking/getData/main?userId=${userId}`)
  return data
}


async function getBookingHistory(userId: number) {
  const {data} = await axios
  .get(`${process.env.REACT_APP_API_URL}/booking/getHistory?userId=${userId}`)
  return data
}

async function bookingCancle(
  bookingId: string,
  success: (data: AxiosResponse) => void,
  dispatch: any,
) {
  try {
    const result = await axios.post(`${process.env.REACT_APP_API_URL}/booking/cancel/${bookingId}`);
    success(result);
  } catch (error: AxiosError | any) {
    useErrorHandlers(dispatch, error);
  }
}

async function getBookingState(userId: number) {
  const { data } = await axios
    .get(`${process.env.REACT_APP_API_URL}/booking/getData/account`, {
      params: { userId },
    })
  return data
}

export { bookingRequest, bookingGetData, bookingGetDataByMain, getBookingHistory, bookingCancle, getBookingState };
