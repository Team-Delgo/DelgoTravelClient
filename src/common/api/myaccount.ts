import axios, { AxiosResponse } from 'axios';
import axiosInstance from './interceptors'
import { useErrorHandlers } from './useErrorHandlers';

async function getMyAccountDataList(userId: number) {
  const accessToken = localStorage.getItem('accessToken') || '';
  const { data } = await axiosInstance.get(`/myAccount`, {
    params: { userId },
    headers: {
      Authorization_Access: accessToken,
    }
  });
  return data;
}

async function changePetInfo(
  data: { email: string; name: string; birthday: string | undefined; size: string },
  dispatch: any,
  success: (data: AxiosResponse) => void,
) {
  try {
  const { email, name, birthday, size } = data;
  const accessToken = localStorage.getItem('accessToken') || '';
  const result = await axiosInstance
    .post(`/changePetInfo`, {
      email,
      name,
      birthday,
      size,
    },{
      headers:{
        Authorization_Access: accessToken
      }
    })
    success(result)
  } catch (err: any) {
    useErrorHandlers(dispatch, err);
  }
}

async function changePassword(email: string, password: string, dispatch: any,success: (data: AxiosResponse) => void) {
  const accessToken = localStorage.getItem("accessToken") || '';
  try {
  const result = await axiosInstance
    .post(`/changePassword`, {
      email,
      newPassword: password,
    },{
      headers:{
        Authorization_Access: accessToken,
      }
    })
    success(result)
  } catch (err: any) {
    useErrorHandlers(dispatch, err);
  }
}

export { getMyAccountDataList, changePetInfo, changePassword };
