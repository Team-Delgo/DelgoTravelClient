import axios, { AxiosResponse, AxiosError } from 'axios';
import { useErrorHandlers } from './useErrorHandlers';
import axiosInstance from './interceptors';



async function wishInsert(
  data: { userId: number; placeId: number; accessToken: string },
  success: (data: AxiosResponse) => void,
) {
  const result = await axiosInstance.post(
    `${process.env.REACT_APP_API_URL}/wish/insert`,
    {
      userId: data.userId,
      placeId: data.placeId,
    },
    {
      headers: {
        Authorization_Access: data.accessToken,
      },
    },
  );
  success(result);
}

async function wishDelete(data: { wishId: number; accessToken: string }, success: (data: AxiosResponse) => void) {
  const result = await axiosInstance.post(`${process.env.REACT_APP_API_URL}/wish/delete/${data.wishId}`, {
    headers: {
      Authorization_Access: data.accessToken,
    },
  });
  success(result);
}

export { wishInsert, wishDelete };
