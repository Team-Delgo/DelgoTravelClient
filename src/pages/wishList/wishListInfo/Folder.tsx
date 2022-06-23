import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { AxiosResponse } from 'axios';
import WishedPlace from './wishedPlace/WishedPlace';
import { getWishedPlaces } from '../../../common/api/getPlaces';
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
  const accessToken = useSelector((state: any) => state.token.token);
  const dispatch = useDispatch();

  useEffect(() => {
    getWishedPlaces({ accessToken, userId }, (response: AxiosResponse) => {
      setWishedPlace(response.data.data);
      console.log(response.data.data)
    }, dispatch);
  }, [accessToken]);

  return (
    <div className="wish-list-container">
      <div className="wish-list-container-header-text" aria-hidden="true" >델고 갈 {wishedPlace?.length}개 장소</div>
      {wishedPlace?.sort((a, b) => b.wishId - a.wishId).map((place) => (
        <WishedPlace place={place} key={place.placeId} wishedPlace={wishedPlace} setWishedPlace={setWishedPlace} />
      ))}
    </div>
  );
}

export default Folder;

