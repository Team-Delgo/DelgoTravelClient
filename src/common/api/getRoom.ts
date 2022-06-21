import axios, { AxiosError, AxiosResponse } from 'axios';
import { useErrorHandlers } from './useErrorHandlers';
import { url } from '../../constants/url.cosnt';

async function getRoomData(roomId: number, success: (data: AxiosResponse) => void, dispatch: any) {
    try {
      const result = await axios.get(`${url}calendar/getDetailRoomCalendarData?roomId=${roomId}`);
      success(result);
    } catch (error: AxiosError | any) {
      useErrorHandlers(dispatch, error);
    }
  }

  export {getRoomData };