import axios, { AxiosResponse } from 'axios';
import { url } from '../../constants/url.cosnt';
import { useErrorHandler } from './useErrorHandler';

async function getReservedDate(
  data: { roomId: string | undefined },
  success: (data: AxiosResponse) => void,
  networkError: () => void,
) {
  const { roomId } = data;
  await axios
    .get(`${process.env.REACT_APP_API_URL}/scalendar/getDetailRoomCalendarData`, {
      params: {
        roomId,
      },
    })
    .then((data) => {
      success(data);
    })
    .catch((error) => {
      networkError();
      useErrorHandler(error);
    });
}

export { getReservedDate };
