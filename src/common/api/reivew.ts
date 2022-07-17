import axios, { AxiosError, AxiosResponse } from 'axios';
import { useErrorHandlers } from './useErrorHandlers';
import { url } from '../../constants/url.cosnt';

async function getDetailPlaceRivews(placeId: string) {
  return fetch(`${url}review/getReview/place?placeId=${placeId}`).then((response) => response.json());
}

async function reviewImageUpload(formdata: FormData,reviewId:number, success: (data: AxiosResponse) => void, dispatch: any) {
  formdata?.forEach((value: any, key: any) => {
    console.log(key, value);
  });
  try {
    const result = await axios.post(`${url}photo/upload/reviewPhoto/${reviewId}`, formdata);
    console.log(result)
    success(result);
  } catch (error: AxiosError | any) {
    useErrorHandlers(dispatch, error);
  }
}

// {
//   headers: {
//     'Content-Type': 'multipart/form-data'
//   }
// }

async function writeReivew(
  data: { userId: number; placeId: number; roomId: number; rating: number; text: string; bookingId:string},
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
      bookingId:data.bookingId
    });
    success(result);
  } catch (error: AxiosError | any) {
    useErrorHandlers(dispatch, error);
  }
}

export { getDetailPlaceRivews, reviewImageUpload,writeReivew };
