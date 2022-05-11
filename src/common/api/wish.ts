import axios, {  AxiosResponse,AxiosError } from 'axios';
import { errorHandler } from './errorHandler';
import { url } from '../../constants/url.cosnt';

async function wishInsert(data: { userId: number; placeId: number; accessToken: string },
  success: (data: AxiosResponse) => void,
) {
  try {
    const result = await axios.post(
      `${url}wish/insert`,
      {
        wish: {
          userId: data.userId,
          placeId: data.placeId,
        },
      },
      {
        headers: {
          Authorization_Access: `${data.accessToken}`,
        },
      },
    );
    success(result);
  } catch (error: AxiosError | any) {
    errorHandler(error);
  }
}

async function wishDelete(data: { wishId: number; accessToken:string }, success: (data: AxiosResponse) => void) {
  try {
    const result = await axios.post(`${url}wish/delete`, {
      wishId:data.wishId,
    },{
      headers: {
        Authorization_Access: `${data.accessToken}`,
      }
    });
    success(result);
  } catch (error: AxiosError | any) {
    errorHandler(error);
  }
}

export { wishInsert, wishDelete };