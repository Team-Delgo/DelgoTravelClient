import axios, { AxiosError, AxiosResponse } from 'axios';
import { useErrorHandlers } from './useErrorHandlers';
import { url } from '../../constants/url.cosnt';

async function getDetailPlaceRivews(placeId: string) {
  return fetch(`${url}review/getReview/place?placeId=${placeId}`).then((response) => response.json());
}

export { getDetailPlaceRivews };
