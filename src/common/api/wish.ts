import axios, { AxiosResponse } from 'axios';
import axiosInstance from './interceptors';
import { useErrorHandlers } from './useErrorHandlers';

async function wishInsert(
  data: { userId: number; placeId: number },
  dispatch: any,
  success: (data: AxiosResponse) => void,
) {
  try {
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
  } catch (err: any) {
    useErrorHandlers(dispatch, err);
  }
}

async function wishDelete(data: { wishId: number }, dispatch: any, success: (data: AxiosResponse) => void) {
  try {
    const accessToken = localStorage.getItem('accessToken') || '';
    const result = await axiosInstance.post(`/wish/delete/${data.wishId}`, {
      headers: {
        Authorization_Access: accessToken,
      },
    });
    success(result);
  } catch (err: any) {
    useErrorHandlers(dispatch, err);
  }
}

export { wishInsert, wishDelete };
