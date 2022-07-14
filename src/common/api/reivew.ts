import axios, { AxiosError, AxiosResponse } from 'axios';
import { useErrorHandlers } from './useErrorHandlers';
import { url } from '../../constants/url.cosnt';

async function getDetailPlaceRivews(placeId: string) {
  return fetch(`${url}review/getReview/place?placeId=${placeId}`).then((response) => response.json());
}

async function reviewImageUpload(formdata: FormData, success: (data: AxiosResponse) => void, dispatch: any) {
  try {
    const result = await axios.post(`${url}photo/upload/reviewPhoto`, formdata, {
      headers: {
        'Content-type': 'multipart/form-data',
      },
    });
    console.log(result)
    success(result);
  } catch (error: AxiosError | any) {
    useErrorHandlers(dispatch, error);
  }
}

async function writeReivew(
  data: { userId: number; placeId: number; roomId: number; rating: number; text: string },
  success: (data: AxiosResponse) => void,
  dispatch: any,
) {
  try {
    const result = await axios.post(`${url}review/write`, {
      userId: data.userId,
      placeId: data.placeId,
      roomId: data.roomId,
      rating: data.rating,
      text: data.text,
    });
    success(result);
  } catch (error: AxiosError | any) {
    useErrorHandlers(dispatch, error);
  }
}

export { getDetailPlaceRivews, reviewImageUpload,writeReivew };
