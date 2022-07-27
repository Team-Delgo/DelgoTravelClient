import axios, { AxiosError, AxiosResponse } from 'axios';
import { useErrorHandlers } from './useErrorHandlers';
import { url } from '../../constants/url.cosnt';

async function getAllPlaces(userId: number, startDt: string, endDt: string) {
  return fetch(`${url}place/selectWheretogo?userId=${userId}&startDt=${startDt}&endDt=${endDt}`).then((response) =>
    response.json()
  );
};

async function getWishedPlaces(accessToken: string ,userId: number) {
  return fetch(`${url}wish/select?userId=${userId}`, {
    // headers: {
    //   Authorization: accessToken
    // }
  }).then((response) =>
    response.json()
  );
};

async function getDetailPlace(userId: number, placeId: string, startDt: string, endDt: string) {
  return fetch( `${url}place/selectDetail?userId=${userId}&placeId=${placeId}&startDt=${startDt}&endDt=${endDt}`).then((response) =>
    response.json()
  );
};

async function getRecommendedPlace(userId:number) {
  return fetch(`${url}place/recommend?userId=${userId}`).then((response) =>
    response.json()
  );
};

async function getEditorNotePlacesAll() {
  return fetch(`${url}place/getEditorNote/all`).then((response) =>
    response.json()
  );
};

async function getEditorNotePlace(placeId:number) {
  return fetch(`${url}place/getEditorNote/place?placeId=${placeId}`).then((response) =>
    response.json()
  );
};

export { getAllPlaces,getWishedPlaces, getDetailPlace,getRecommendedPlace,getEditorNotePlacesAll ,getEditorNotePlace};
