/* eslint-disable no-param-reassign */
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}`
});

axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('accessToken') || '';
    try {
      if (config.headers !== undefined && accessToken !=='') {
        console.log('config',config)
        console.log('accessToken',accessToken)
        config.headers.authorization_access = accessToken;
      }
      return config;
    } catch (err) {
      console.error('err', err);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    console.log('error', error);
    const {
      config,
      response: { status },
    } = error;
    console.log('error.response.status', error.response.status);
    console.log('config', config);
    if (status === 403) {
      const refreshToken = localStorage.getItem('refreshToken') || '';
      const accessToken = localStorage.getItem('accessToken') || '';
      console.log('refreshToken', refreshToken);
      console.log('accessToken', accessToken);

      const response = await axios.get(`${process.env.REACT_APP_API_URL}/tokenReissue`, {
        headers: {
          authorization_refresh: refreshToken,
        },
      });

      if (response.data.code === 333) {
        console.log('refresh token 만료');
        throw new Error('token exprired');
      }


      console.log('response', response);
      console.log('config', config);
      const originalRequest = config;
      const newAccessToken = response.headers.authorization_access;
      const newRefreshToken = response.headers.authorization_refresh;

      console.log('newAccessToken : ', newAccessToken);
      console.log('newRefreshToken : ', newRefreshToken);

      localStorage.setItem('accessToken', newAccessToken);
      localStorage.setItem('refreshToken', newRefreshToken);

      originalRequest.headers.authorization_access = newAccessToken;

      return axios(originalRequest);
    } 
    return Promise.reject(error);
  },
);

export default axiosInstance;
