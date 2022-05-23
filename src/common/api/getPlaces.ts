import axios, { AxiosError, AxiosResponse } from 'axios';
import { useErrorHandler } from './useErrorHandler';
import { url } from '../../constants/url.cosnt';

async function getAllPlaces(userId: number, success: (data: AxiosResponse) => void) {
  try {
    const result = await axios.get(`${url}place/selectWheretogo?userId=${userId}`);
    success(result);
  } catch (error: AxiosError | any) {
    useErrorHandler(error);
  }
}

async function getWishedPlaces(data: { accessToken: string; userId: number }, success: (data: AxiosResponse) => void) {
  try {
    const result = await axios.get(`${url}wish/select?userId=${data.userId}`, {
      headers: {
        Authorization_Access: `${data.accessToken}`,
      },
    });
    success(result);
  } catch (error: AxiosError | any) {
    useErrorHandler(error);
  }
}

async function getDetailPlace(data: { userId: number; placeId: number }, success: (data: AxiosResponse) => void) {
  try {
    const result = await axios.get(`${url}place/selectDetail?userId=${data.userId}&placeId=${data.placeId}`);
    success(result);
  } catch (error: AxiosError | any) {
    useErrorHandler(error);
  }
}

export { getAllPlaces, getWishedPlaces, getDetailPlace };
