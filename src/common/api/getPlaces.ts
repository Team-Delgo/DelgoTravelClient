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
    const startDt = `${data.startDt.substring(0, 4)}-${data.startDt.substring(4, 6)}-${data.startDt.substring(6, 8)}`;
    const endDt = `${data.endDt.substring(0, 4)}-${data.endDt.substring(4, 6)}-${data.endDt.substring(6, 8)}`;
    const result = await axios.get(
      `${url}place/selectDetail?userId=${data.userId}&placeId=${data.placeId}&startDt=${startDt}&endDt=${endDt}`,
    );
    success(result);
  } catch (error: AxiosError | any) {
    useErrorHandlers(dispatch, error);
  }
}

export { getAllPlaces, getWishedPlaces, getDetailPlace };
