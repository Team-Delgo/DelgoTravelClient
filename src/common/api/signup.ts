import axios, { AxiosResponse } from 'axios';
import { url } from '../../constants/url.cosnt';
import { errorHandler } from './errorHandler';

async function emailCheck(email: string, success: (data: AxiosResponse) => void) {
  axios
    .post(`${url}auth/emailCheck`, {
      email,
    })
    .then((data) => {
      success(data);
    })
    .catch((error) => {
      errorHandler(error);
    });
}

export { emailCheck };
