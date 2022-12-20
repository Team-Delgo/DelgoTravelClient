import { AxiosResponse } from 'axios';
import TravelHistoryPlace from '../../pages/myStorage/historyInfo/travelHistoryPlace/TravelHistoryPlace';
import axiosInstance from './interceptors';
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
    orderId: string | null;
    paymentKey: string | null;
  },
  dispatch: any,
  success: (data: AxiosResponse) => void,
) {
  const startDt = `${data.startDt.substring(0, 4)}-${data.startDt.substring(4, 6)}-${data.startDt.substring(6, 10)}`;
  const endDt = `${data.endDt.substring(0, 4)}-${data.endDt.substring(4, 6)}-${data.endDt.substring(6, 10)}`;
  try {
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
    );
    success(result);
  } catch (err: any) {
    useErrorHandlers(dispatch, err);
  }
}

async function bookingGetData(
  data: {
    bookingId: string;
  },
  dispatch: any,
  success: (data: AxiosResponse) => void,
) {
  try {
    const result = await axiosInstance.get(`/booking/getData?bookingId=${data.bookingId}`);
    success(result);
    console.log(result)
  } catch (err: any) {
    console.log(err)
    useErrorHandlers(dispatch, err);
  }
}

async function bookingGetDataByMain(userId: number) {
  if (userId === 0) return;
    const { data } = await axiosInstance.get(`/booking/getData/main?userId=${userId}`);
    return data;
}

async function getBookingHistory(userId: number) {
    const { data } = await axiosInstance.get(`/booking/getHistory?userId=${userId}`);
    return data;
}

async function bookingCancle(bookingId: string, dispatch: any, success: (data: AxiosResponse) => void) {
  try {
    const result = await axiosInstance.post(`/booking/cancel/${bookingId}`);
    success(result);
  } catch (err: any) {
    useErrorHandlers(dispatch, err);
  }
}

async function getBookingState(userId: number, dispatch: any) {
  try {
    const { data } = await axiosInstance.get(`/booking/getData/account`, {
      params: { userId },
    });
    return data;
  } catch (err: any) {
    useErrorHandlers(dispatch, err);
  }
}

export { bookingRequest, bookingGetData, bookingGetDataByMain, getBookingHistory, bookingCancle, getBookingState };
