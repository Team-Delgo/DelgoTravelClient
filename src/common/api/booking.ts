import { AxiosResponse } from 'axios';
import axiosInstance from './interceptors';

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
    orderId: string | null;
    paymentKey: string | null;
  },
  success: (data: AxiosResponse) => void,
) {
  const accessToken = localStorage.getItem('accessToken') || '';
  const startDt = `${data.startDt.substring(0, 4)}-${data.startDt.substring(4, 6)}-${data.startDt.substring(6, 10)}`;
  const endDt = `${data.endDt.substring(0, 4)}-${data.endDt.substring(4, 6)}-${data.endDt.substring(6, 10)}`;
  const result = await axiosInstance.post(
      `/booking/request`,
      {
        userId: data.userId,
        placeId: data.placeId,
        roomId: data.roomId,
        couponId: data.couponId,
        reservedName: data.reservedName,
        point: data.point,
        startDt,
        endDt,
        orderId: data.orderId,
        paymentKey: data.paymentKey,
      },
      {
        headers: {
          Authorization_Access: accessToken,
        },
      },
    );
    success(result);
}

async function bookingGetData(
  data: {
    bookingId: string;
  },
  success: (data: AxiosResponse) => void,
) {
  const accessToken = localStorage.getItem('accessToken') || '';
  const result = await axiosInstance.get(`/booking/getData?bookingId=${data.bookingId}`, {
      headers: {
        Authorization_Access: accessToken,
      },
    });
  success(result);
}

async function bookingGetDataByMain(userId: number) {
  const accessToken = localStorage.getItem('accessToken') || '';
  const { data } = await axiosInstance.get(`/booking/getData/main?userId=${userId}`, {
    headers: {
      Authorization_Acess: accessToken,
    },
  });
  return data;
}

async function getBookingHistory(userId: number) {
  const accessToken = localStorage.getItem('accessToken') || '';
  const { data } = await axiosInstance.get(`/booking/getHistory?userId=${userId}`, {
    headers: {
      Authorization_Access: accessToken,
    },
  });
  return data;
}

async function bookingCancle(bookingId: string, success: (data: AxiosResponse) => void) {
  const accessToken = localStorage.getItem('accessToken') || '';
  const result = await axiosInstance.post(`/booking/cancel/${bookingId}`, {
      headers: {
        Authorization_Access: accessToken,
      },
    });
  success(result);
}

async function getBookingState(userId: number) {
  const accessToken = localStorage.getItem('accessToken') || '';
  const { data } = await axiosInstance.get(
    `/booking/getData/account`,
    {
      params: { userId },
      headers: {
        Authorization_Access: accessToken,
      },
    },
  );
  return data;
}

export { bookingRequest, bookingGetData, bookingGetDataByMain, getBookingHistory, bookingCancle, getBookingState };
