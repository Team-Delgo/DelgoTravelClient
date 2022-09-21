import axios, { AxiosError, AxiosResponse } from 'axios';
import axiosInstance from './interceptors';
import { useErrorHandlers } from './useErrorHandlers';


async function getDetailPlaceRivews(placeId: string) {
  const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/review/getReview/place?placeId=${placeId}`);
  return data;
  // return fetch(`${process.env.REACT_APP_API_URL}/review/getReview/place?placeId=${placeId}`).then((response) =>
  //   response.json(),
  // );
}

async function reviewImageUpload(formdata: FormData,reviewId:number, success: (data: AxiosResponse) => void) {
    const accessToken = localStorage.getItem('accessToken') || '';
    const result = await axiosInstance.post(`/photo/upload/reviewPhoto/${reviewId}`, formdata, {
      headers: {
        Authorization_Access: accessToken,
      },
    });
    success(result);
}

async function writeReivew(
  data: { userId: number; placeId: number; roomId: number; rating: number; text: string; bookingId: string },
  success: (data: AxiosResponse) => void,
) {
  const accessToken = localStorage.getItem('accessToken') || '';
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
    {
      headers: {
        Authorization_Access: accessToken,
      },
    },
  );
  success(result);
}

async function getMyReviewList(userId: number) {
  const accessToken = localStorage.getItem('accessToken') || '';
  const { data } = await axiosInstance.get(`/review/getReview/user`, {
    params: {
      userId,
    },
    headers: {
      Authorization_Access: accessToken,
    },
  });
  return data;
}

export { getDetailPlaceRivews, reviewImageUpload, writeReivew, getMyReviewList };
