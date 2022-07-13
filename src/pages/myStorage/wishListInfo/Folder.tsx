import React, { useState, useEffect } from 'react'
import { useLocation} from 'react-router-dom';
import { useSelector } from "react-redux";
import { useQuery } from 'react-query'
import { useDispatch } from 'react-redux';
import WishedPlace from './wishedPlace/WishedPlace';
import { getWishedPlaces } from '../../../common/api/getPlaces';
import PopularPlace from '../historyInfo/popularPlace/PopularPlace'
import { useErrorHandlers } from '../../../common/api/useErrorHandlers';
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
  // const [wishedPlace, setWishedPlace] = useState<Array<WishedPlaceType>>([]);
  const userId = useSelector((state: any) => state.persist.user.user.id);
  const accessToken = useSelector((state: any) => state.token.token);
  const dispatch = useDispatch()
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
  ]);
  const location: any = useLocation();
  const { myStorageY } = useSelector((state: any) => state.persist.scroll);

  const { isLoading, data: wishedPlaces, refetch } = useQuery(
    'getWishedPlaces',
    () => getWishedPlaces(accessToken, userId),
    {
      cacheTime: 1000 * 60 * 5,
      staleTime: 1000 * 60 * 3,
      onError: (error: any) => {
        useErrorHandlers(dispatch, error)
      }
    },
  );

  useEffect(() => {
    if (location.state?.prevPath.includes('/detail-place')) {
        window.scrollTo(0, myStorageY);
    } else {
      window.scrollTo(0, 0);
    }
  }, [isLoading]);
  


  // useEffect(() => {
  //   getWishedPlaces(
  //     { accessToken, userId },
  //     (response: AxiosResponse) => {
  //       setWishedPlace(response.data.data);
  //       setIsLoading(false)
  //       // if(response.data.data.length>0){
  //       //   setIsLoading(false)
  //       // }
  //     },
  //     dispatch,
  //   );
  // }, [accessToken]);

  if (isLoading)
    return (
      <div className="wish-list-container">
        &nbsp;
      </div>
    );

  return (
    <div className="wish-list-container">
      {wishedPlaces.data.length>0 ? (
        <div className="wish-list-header-text" aria-hidden="true">
          델고 갈 {wishedPlaces.data.length}개 장소
        </div>
      ) : (
        <div className="wish-list-notice">
          <FootPrintActive className="wish-list-notice-foot-print" />
          <div className="wish-list-notice-main">마음에 드는 숙소가 없나요?</div>
          <div className="wish-list-notice-sub">인기 숙소를 보여드릴게요</div>
        </div>
      )}
      {wishedPlaces.data.length>0 
        ? wishedPlaces.data
            .sort((a:WishedPlaceType, b:WishedPlaceType) => b.wishId - a.wishId)
            .map((place:WishedPlaceType) => (
              <WishedPlace
                place={place}
                key={place.placeId}
                // wishedPlace={wishedPlace}
                // setWishedPlace={setWishedPlace}
                refetch={refetch}
              />
            ))
        : popularPlace.map((place) => <PopularPlace place={place} key={place.id} />)}
    </div>
  );
}

export default Folder;

