import axios, { AxiosError, AxiosResponse } from 'axios';
import axiosInstance from './interceptors';
import { useErrorHandlers } from './useErrorHandlers';


async function getDetailPlaceRivews(placeId: string) {
  const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/review/getReview/place?placeId=${placeId}`);
  return data;
}

async function reviewImageUpload(formdata: FormData,reviewId:number, dispatch:any,success: (data: AxiosResponse) => void) {
  try {
    const result = await axiosInstance.post(`/photo/upload/reviewPhoto/${reviewId}`, formdata);
    success(result);
  } catch (err: any) {
    useErrorHandlers(dispatch, err);
  }
}

async function writeReivew(
  data: { userId: number; placeId: number; roomId: number; rating: number; text: string; bookingId: string },
  dispatch:any,
  success: (data: AxiosResponse) => void,
) {
  try {
    const result = await axiosInstance.post(
      `/review/write`,
      {
        userId: data.userId,
        placeId: data.placeId,
        roomId: data.roomId,
        rating: data.rating,
        text: data.text,
        bookingId: data.bookingId,
      },
    );
    success(result);
  } catch (err: any) {
    useErrorHandlers(dispatch, err);
  }
}

async function getMyReviewList(userId: number) {
  const { data } = await axiosInstance.get(`/review/getReview/user`, {
    params: {
      userId,
    },
  });
  return data;
}

async function getReviewData(reviewId:number) {
    const data = await axiosInstance.get(`/review/photo?reviewId=${reviewId}`);
    return data;
}


export { getDetailPlaceRivews, reviewImageUpload, writeReivew, getMyReviewList,getReviewData };
