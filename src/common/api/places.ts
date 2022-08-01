import axios, { AxiosError, AxiosResponse } from 'axios';
import { useErrorHandlers } from './useErrorHandlers';
import { url } from '../../constants/url.cosnt';

async function getAllPlaces(userId: number, startDt: string, endDt: string) {
  return fetch(`${process.env.REACT_APP_API_URL}/place/selectWheretogo?userId=${userId}&startDt=${startDt}&endDt=${endDt}`).then((response) =>
    response.json()
  );
};

async function getWishedPlaces(accessToken: string ,userId: number) {
  return fetch(`${process.env.REACT_APP_API_URL}/wish/select?userId=${userId}`, {
    // headers: {
    //   Authorization: accessToken
    // }
  }).then((response) =>
    response.json()
  );
};

async function getDetailPlace(userId: number, placeId: string, startDt: string, endDt: string) {
  return fetch( `${process.env.REACT_APP_API_URL}/place/selectDetail?userId=${userId}&placeId=${placeId}&startDt=${startDt}&endDt=${endDt}`).then((response) =>
    response.json()
  );
};

async function getRecommendedPlace(userId:number) {
  return fetch(`${process.env.REACT_APP_API_URL}/place/recommend?userId=${userId}`).then((response) =>
    response.json()
  );
};

async function getEditorNotePlacesAll() {
  return fetch(`${process.env.REACT_APP_API_URL}/place/getEditorNote/all`).then((response) =>
    response.json()
  );
};

async function getEditorNotePlace(placeId:number) {
  return fetch(`${process.env.REACT_APP_API_URL}/place/getEditorNote/place?placeId=${placeId}`).then((response) =>
    response.json()
  );
};

export { getAllPlaces,getWishedPlaces, getDetailPlace,getRecommendedPlace,getEditorNotePlacesAll ,getEditorNotePlace};
