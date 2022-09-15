import axios, { AxiosResponse } from 'axios';
import axiosInstance from './interceptors'

async function getMyAccountDataList(userId: number) {
  const accessToken = localStorage.getItem('accessToken') || '';
  const { data } = await axiosInstance.get(`/myAccount`, {
    params: { userId },
    headers: {
      Authorization_Access: accessToken,
    }
  });
  console.log(data);
  return data;
}

async function changePetInfo(
  data: { email: string; name: string; birthday: string | undefined; size: string },
  success: (data: AxiosResponse) => void,
) {
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
}

async function changePassword(email: string, password: string, success: (data: AxiosResponse) => void) {
  const accessToken = localStorage.getItem("accessToken") || '';
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
}

export { getMyAccountDataList, changePetInfo, changePassword };
