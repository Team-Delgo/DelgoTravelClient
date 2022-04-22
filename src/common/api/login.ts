import axios, { AxiosError, AxiosResponse } from 'axios';
import { useDispatch } from 'react-redux';
import { userActions } from '../../redux/reducers/userSlice';
import { errorHandler } from './errorHandler';
import { url } from '../../constants/url.cosnt';

async function login(data: { email: string; password: string }, success: (data: AxiosResponse) => void) {
  await axios
    .post(`${url}login`, {
      email: data.email,
      password: data.password,
    })
    .then((data) => {
      success(data);
    })
    .catch((error) => {
      errorHandler(error);
    });
}

async function tokenRefresh(
  data: { accessToken: string; refreshToken: string },
  success: (data: AxiosResponse) => void,
) {
  await axios
    .get(`${url}tokenReissue`, {
      headers: {
        Authorization_Access: `Bearer ${data.accessToken}`,
        Authorization_Refresh: `Bearer ${data.refreshToken}`,
      },
    })
    .then((data) => {
      success(data);
    })
    .catch((error) => {
      errorHandler(error);
    });
}
export { login, tokenRefresh };
