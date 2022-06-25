import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { AxiosResponse } from 'axios';
import WishedPlace from './wishedPlace/WishedPlace';
import { getWishedPlaces } from '../../../common/api/getPlaces';
import PopularPlace from '../historyInfo/popularPlace/PopularPlace'
import { ReactComponent as FootPrintActive } from '../../../icons/foot-print-active.svg';
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

interface PopularPlaceType  {
  id: number;
  image: string;
  name: string;
  location: string;
};


function Folder() {
  const [wishedPlace, setWishedPlace] = useState<Array<WishedPlaceType>>([]);
  const userId = useSelector((state: any) => state.persist.user.user.id);
  const accessToken = useSelector((state: any) => state.token.token);
  const [hasWishedPlaces, setHasWishedPlaces] = useState(false);
  const dispatch = useDispatch();
  const [popularPlace, setPopularPlace] = useState<Array<PopularPlaceType>>([
    {
      id: 1,
      image: `${process.env.PUBLIC_URL}/assets/images/recommendedPlaceImage.png`,
      name: '멍멍이네 하우스',
      location: '강원도 속초시 조앙동',
    },
    {
      id: 2,
      image: `${process.env.PUBLIC_URL}/assets/images/recommendedPlaceImage.png`,
      name: '멍멍이네 하우스',
      location: '강원도 속초시 조앙동',
    },
    {
      id: 3,
      image: `${process.env.PUBLIC_URL}/assets/images/recommendedPlaceImage.png`,
      name: '멍멍이네 하우스',
      location: '강원도 속초시 조앙동',
    },
  ]);

  useEffect(() => {
    getWishedPlaces(
      { accessToken, userId },
      (response: AxiosResponse) => {
        setWishedPlace(response.data.data);
        if (response.data.data.length > 0) {
          setHasWishedPlaces(true);
        }
      },
      dispatch,
    );
  }, [accessToken]);

  return (
    <div className="wish-list-container">
      {hasWishedPlaces===true? (
        <div className="wish-list-header-text" aria-hidden="true">
          델고 갈 {wishedPlace?.length}개 장소
        </div>
      ) : (
        <div className="wish-list-notice">
          <FootPrintActive className="wish-list-notice-foot-print" />
          <div className="wish-list-notice-main">마음에 드는 숙소가 없나요?</div>
          <div className="wish-list-notice-sub">인기 숙소를 보여드릴게요</div>
        </div>
      )}
      {hasWishedPlaces===true
        ? wishedPlace
            .sort((a, b) => b.wishId - a.wishId)
            .map((place) => (
              <WishedPlace
                place={place}
                key={place.placeId}
                wishedPlace={wishedPlace}
                setWishedPlace={setWishedPlace}
              />
            ))
        : popularPlace.map((place) => <PopularPlace place={place} key={place.id} />)}
    </div>
  );
}

export default Folder;

