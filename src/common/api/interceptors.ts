import axios from 'axios';


const refreshToken = localStorage.getItem("refreshToken") || '';


const Api = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}`,
  timeout: 10000,
  params: {},
});

async function tokenRefresh() {
    await axios
      .get(`${process.env.REACT_APP_API_URL}/tokenReissue`, {
        headers: {
          Authorization_Refresh: refreshToken,
        },
      })
      .then((response) => {
        const newAccessToken = response.headers.authorization_access;
        const newRefreshToken = response.headers.authorization_refresh;

        // dispatch(tokenActions.setToken(newAccessToken));
        localStorage.setItem('refreshToken', newRefreshToken);
      })
    //   .catch((error) => {
    //     useErrorHandlers(dispatch, error);
    //   });
  }

Api.interceptors.request.use(tokenRefresh);

export default Api;
