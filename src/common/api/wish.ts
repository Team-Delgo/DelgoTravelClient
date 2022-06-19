import axios, { AxiosResponse, AxiosError } from 'axios';
import { useErrorHandlers } from './useErrorHandlers';
import { url } from '../../constants/url.cosnt';

async function wishInsert(
  data: { userId: number; placeId: number; accessToken: string },
  success: (data: AxiosResponse) => void,
  dispatch: any,
) {
  try {
    const result = await axios.post(
      `${url}wish/insert`,
      {
          userId: data.userId,
          placeId: data.placeId,
      },
      {
        headers: {
          Authorization_Access: `${data.accessToken}`,
        },
      },
    );
    success(result);
  } catch (error: AxiosError | any) {
    useErrorHandlers(dispatch, error);
  }
}

async function wishDelete(
  data: { wishId: number; accessToken: string },
  success: (data: AxiosResponse) => void,
  dispatch: any,
) {
  try {
    const result = await axios.post(
      `${url}wish/delete`,
      {
        wishId: data.wishId,
      },
      {
        headers: {
          Authorization_Access: `${data.accessToken}`,
        },
      },
    );
    success(result);
  } catch (error: AxiosError | any) {
    useErrorHandlers(dispatch, error);
  }
}

export { wishInsert, wishDelete };
