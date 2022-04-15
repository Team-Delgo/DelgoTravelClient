import axios, { AxiosError, AxiosResponse } from 'axios';
import { useDispatch } from 'react-redux';
import { userActions } from '../../redux/reducers/userSlice';
import { errorHandler } from './errorHandler';
import { url } from '../../constants/url.cosnt';

async function getAllPlaces(success: (data: AxiosResponse) => void) {
  try {
    const result = await axios.get(`${url}place/selectAll`);
    success(result);
  } catch (error: any) {
    errorHandler(error);
  }
}
export default getAllPlaces;
