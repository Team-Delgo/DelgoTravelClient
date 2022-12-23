import axios, { AxiosResponse } from 'axios';

async function getReservedDate(
  data: { roomId: string | undefined },
  success: (data: AxiosResponse) => void,
  networkError: () => void,
) {
  const { roomId } = data;
  await axios
    .get(`${process.env.REACT_APP_API_URL}/calendar/getDetailRoomCalendarData`, {
      params: {
        roomId,
      },
    })
    .then((data) => {
      success(data);
    })
    .catch((error) => {
      networkError();
    });
}

export { getReservedDate };
