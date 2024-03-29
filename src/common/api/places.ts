import axios from 'axios';
import axiosInstance from './interceptors';
import { useErrorHandlers } from './useErrorHandlers';


async function getAllPlaces(userId: number, startDt: string, endDt: string) {
  const { data } = await axios
    .get(`${process.env.REACT_APP_API_URL}/place/selectWheretogo?userId=${userId}&startDt=${startDt}&endDt=${endDt}`)
  return data
}

async function getWishedPlaces(userId: number) {
    const { data } = await axiosInstance.get(`/wish/select?userId=${userId}`);
    return data;
}

async function getDetailPlace(userId: number, placeId: string, startDt: string, endDt: string) {
  const { data } = await axios
    .get(`${process.env.REACT_APP_API_URL}/place/selectDetail?userId=${userId}&placeId=${placeId}&startDt=${startDt}&endDt=${endDt}`, {
    })
  return data
}

async function getRecommendedPlace(userId: number) {
    const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/place/recommend?userId=${userId}`,{});
    return data;
}

async function getEditorNotePlacesAll() {
  const { data } = await axios
    .get(`${process.env.REACT_APP_API_URL}/place/getEditorNote/all`, {
    })
  return data
}

async function getEditorNotePlace(placeId: number) {
  const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/place/getEditorNote/place?placeId=${placeId}`, {});
  return data;
}


export { getAllPlaces, getWishedPlaces, getDetailPlace, getRecommendedPlace, getEditorNotePlacesAll, getEditorNotePlace };
