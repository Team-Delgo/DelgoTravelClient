import axios, { AxiosError, AxiosResponse } from 'axios';
import { useErrorHandlers } from './useErrorHandlers';


async function getRoomData(roomId: number, success: (data: AxiosResponse) => void, dispatch: any) {
    try {
      const result = await axios.get(`${process.env.REACT_APP_API_URL}/calendar/getDetailRoomCalendarData?roomId=${roomId}`);
      success(result);
    } catch (error: AxiosError | any) {
      useErrorHandlers(dispatch, error);
    }
  }

  export {getRoomData };