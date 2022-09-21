import axios, { AxiosResponse } from 'axios';
import axiosInstance from './interceptors';

async function wishInsert(data: { userId: number; placeId: number }, success: (data: AxiosResponse) => void) {
  const accessToken = localStorage.getItem('accessToken') || '';
  const result = await axiosInstance.post(
    `/wish/insert`,
    {
      userId: data.userId,
      placeId: data.placeId,
    },
    {
      headers: {
        Authorization_Access: accessToken,
      },
    },
  );
  success(result);
}

async function wishDelete(data: { wishId: number }, success: (data: AxiosResponse) => void) {
  const accessToken = localStorage.getItem('accessToken') || '';
  const result = await axiosInstance.post(`/wish/delete/${data.wishId}`, {
    headers: {
      Authorization_Access: accessToken,
    },
  });
  success(result);
}

export { wishInsert, wishDelete };
