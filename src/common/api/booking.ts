import axios, { AxiosResponse, AxiosError } from 'axios';
import { useErrorHandlers } from './useErrorHandlers';
import { url } from '../../constants/url.cosnt';

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
    const result = await axios.post(`${url}booking/request`, {
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

async function bookingGetDataByMain(accessToken: string, userId: number) {
  return fetch(`${url}booking/getData/main?userId=${userId}`).then((response) => response.json());
}

// , {
//   headers: {
//     Authorization: accessToken,
//   },
// }

async function getBookingHistory(userId: number) {
  return fetch(`${url}booking/getHistory?userId=${userId}`).then((response) =>
    response.json()
  );
};


async function bookingCancle(
  bookingId: string,
  success: (data: AxiosResponse) => void,
  dispatch: any,
) {
  try {
    console.log(2)
    const result = await axios.post(`${url}booking/cancel/${bookingId}`);
    success(result);
    console.log(result)
  } catch (error: AxiosError | any) {
    useErrorHandlers(dispatch, error);
  }
}

export { bookingRequest, bookingGetData, bookingGetDataByMain, getBookingHistory,bookingCancle };
