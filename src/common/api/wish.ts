import axios, {  AxiosResponse } from 'axios';
import { errorHandler } from './errorHandler';
import { url } from '../../constants/url.cosnt';

async function wishInsert(data: { userId: number; placeId: number }, success: (data: AxiosResponse) => void) {
  try {
    const result = await axios.post(`${url}wish/insert`, {
      wish: {
        userId: data.userId,
        placeId: data.placeId,
      },
    });
    success(result);
  } catch (error: any) {
    errorHandler(error);
  }
}

async function wishDelete(data: { wishId: number }, success: (data: AxiosResponse) => void) {
  try {
    const result = await axios.post(`${url}wish/delete`, {
      wishId:data.wishId
    });
    console.log(result)
    success(result);
  } catch (error: any) {
    errorHandler(error);
  }
}

export { wishInsert, wishDelete };