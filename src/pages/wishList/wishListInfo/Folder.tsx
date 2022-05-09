/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable array-callback-return */
import React,{useState,useEffect} from 'react'
import { useSelector } from "react-redux";
import { AxiosResponse } from 'axios';
import WishedPlace from './WishedPlace';
import {getWishedPlaces} from '../../../common/api/getPlaces';
import './Folder.scss';


interface WishedPlaceType {
  address: string;
  lowestPrice: string;
  mainPhotoUrl: string;
  name: string;
  placeId: number;
  registDt: string;
  wishId: number;
}

function Folder() {
  const [wishedPlace, setWishedPlace] = useState<Array<WishedPlaceType>>([]);
  const userId = useSelector((state: any) => state.persist.user.user.id);

  useEffect(() => {
    getWishedPlaces(userId, (response: AxiosResponse) => {
      setWishedPlace(response.data.data);
    });
  }, []);

  return (
    <div className="wish-list-container">
      <div className="wish-list-container-header-text">저장 된 {wishedPlace.length}개의 숙소</div>
      {wishedPlace.map((place) => (
        <WishedPlace place={place} key={place.placeId} wishedPlace={wishedPlace} setWishedPlace={setWishedPlace}/>
      ))}
    </div>
  );
}

export default Folder;

