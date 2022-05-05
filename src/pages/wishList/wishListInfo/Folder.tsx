/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable array-callback-return */
import React,{useState,useEffect} from 'react'
import { useSelector } from "react-redux";
import { AxiosResponse } from 'axios';
import WishedPlace from './WishedPlace';
import getAllPlaces from '../../../common/api/getAllPlaces';
import './Folder.scss';

interface WishedPlaceType {
  id: number;
  image: string;
  name: string;
  location: string;
};

interface PlaceType {
  address: string;
  lowestPrice: string;
  mainPhotoUrl: string;
  name: string;
  placeId: number;
  registDt: string;
  wishId: number;
}

function Folder() {
  // const [wishedPlace, setWishedPlace] = useState<Array<WishedPlaceType>>([
  //     {
  //       id: 1,
  //       image: `${process.env.PUBLIC_URL}/assets/images/recommendedPlaceImage.png`,
  //       name: '멍멍이네 하우스',
  //       location: '강원도 속초시 조앙동',
  //     },
  //     {
  //       id: 2,
  //       image: `${process.env.PUBLIC_URL}/assets/images/recommendedPlaceImage.png`,
  //       name: '멍멍이네 하우스',
  //       location: '강원도 속초시 조앙동',
  //     },
  //     {
  //       id: 3,
  //       image: `${process.env.PUBLIC_URL}/assets/images/recommendedPlaceImage.png`,
  //       name: '멍멍이네 하우스',
  //       location: '강원도 속초시 조앙동',
  //     },
  //   ]);

  const [wishedPlace, setWishedPlace] = useState<Array<PlaceType>>([]);
  const userId = useSelector((state: any) => state.persist.user.user.id);

  useEffect(() => {
    getAllPlaces(userId, (response: AxiosResponse) => {
      setWishedPlace(response.data.data);
      console.log(response.data.data)
    });
  }, []);

  return (
    <div className="wish-list-container">
      <div className="wish-list-container-header-text">저장 된 {wishedPlace.length}개의 숙소</div>
      {wishedPlace.map((place) => {
        if (place.wishId > 0) {
          return <WishedPlace place={place} key={place.placeId} />;
        }
      })}
    </div>
  );
}

export default Folder;

//  <WishedPlace place={place} key={place.id} />