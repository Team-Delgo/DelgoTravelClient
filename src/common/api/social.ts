import axios, { AxiosResponse } from 'axios';
import { useErrorHandlers } from './useErrorHandlers';

async function setAccessCode(code: string | null, success: (data: AxiosResponse) => void, dispatch: any) {
  await axios
    .post(`${process.env.REACT_APP_API_URL}/setAccessCode/kakao/${code}`)
    .then((data) => {
      success(data);
    })
    .catch((error) => {
      useErrorHandlers(dispatch, error);
    });
}

export { setAccessCode };
