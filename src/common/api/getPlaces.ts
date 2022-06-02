import axios, { AxiosError, AxiosResponse } from 'axios';
import { useErrorHandlers } from './useErrorHandlers';
import { url } from '../../constants/url.cosnt';

async function getAllPlaces(userId: number, success: (data: AxiosResponse) => void, dispatch: any) {
  try {
    const result = await axios.get(`${url}place/selectWheretogo?userId=${userId}`);
    success(result);
  } catch (error: AxiosError | any) {
    useErrorHandlers(dispatch, error);
  }
}

async function getWishedPlaces(
  data: { accessToken: string; userId: number },
  success: (data: AxiosResponse) => void,
  dispatch: any,
) {
  try {
    const result = await axios.get(`${url}wish/select?userId=${data.userId}`, {
      headers: {
        Authorization_Access: `${data.accessToken}`,
      },
    });
    success(result);
  } catch (error: AxiosError | any) {
    useErrorHandlers(dispatch, error);
  }
}

async function getDetailPlace(
  data: { userId: number; placeId: number; startDt: string; endDt: string },
  success: (data: AxiosResponse) => void,
  dispatch: any,
) {
  try {
    const result = await axios.get(
      `${url}place/selectDetail?userId=${data.userId}&placeId=${data.placeId}&startDt=${data.startDt.substring(
        0,
        4,
      )}-${data.startDt.substring(4, 6)}-${data.startDt.substring(6, 8)}&endDt=${data.endDt.substring(
        0,
        4,
      )}-${data.startDt.substring(4, 6)}-${data.startDt.substring(6, 8)}`,
    );
    success(result);
  } catch (error: AxiosError | any) {
    useErrorHandlers(dispatch, error);
  }
}

export { getAllPlaces, getWishedPlaces, getDetailPlace };
