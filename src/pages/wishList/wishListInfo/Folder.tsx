import React, { useState, useEffect,useLayoutEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { AxiosResponse } from 'axios';
import { useQuery } from 'react-query'
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
  ]);


  const { isLoading, error, data, isFetching } = useQuery(
    'getWishedPlaces',
    () => fetch(`http://49.50.161.156/wish/select?userId=${userId}`).then((res) => res.json()),
    {
      cacheTime: 10000, // cacheTime : 언마운트된 후 어느 시점까지 메모리에 데이터를 저장하여 캐싱할 것인지를 결정함.
      staleTime: 10000, // staleTime : 마운트 되어 있는 시점에서 데이터가 구식인지 판단함.
      refetchInterval: false, // 데이터 변경시 fetch하는시간 // default:false : db 데이터값 변경하면 즉시 변경
    },
  );

  // useLayoutEffect(() => {
  //   getWishedPlaces(
  //     { accessToken, userId },
  //     (response: AxiosResponse) => {
  //       setWishedPlace(response.data.data);
  //       if (response.data.data.length > 0) {
  //         setHasWishedPlaces(true);
  //       }
  //     },
  //     dispatch,
  //   );
  // }, [accessToken]);

  // useEffect(() => {
  //   getWishedPlaces(
  //     { accessToken, userId },
  //     (response: AxiosResponse) => {
  //       setWishedPlace(response.data.data);
  //     },
  //     dispatch,
  //   );
  // }, [accessToken]);

  return (
    <div className="wish-list-container">
      {data?.data.length>0? (
        <div className="wish-list-header-text" aria-hidden="true">
          델고 갈 {data.data.length}개 장소
        </div>
      ) : (
        <div className="wish-list-notice">
          <FootPrintActive className="wish-list-notice-foot-print" />
          <div className="wish-list-notice-main">마음에 드는 숙소가 없나요?</div>
          <div className="wish-list-notice-sub">인기 숙소를 보여드릴게요</div>
        </div>
      )}
      {data?.data.length>0
        ? data.data
            .sort((a:WishedPlaceType, b:WishedPlaceType) => b.wishId - a.wishId)
            .map((place:WishedPlaceType) => (
              <WishedPlace
                place={place}
                key={place.placeId}
                wishedPlace={data.data}
                setWishedPlace={setWishedPlace}
              />
            ))
        : popularPlace.map((place) => <PopularPlace place={place} key={place.id} />)}
    </div>
  );
}

export default Folder;

