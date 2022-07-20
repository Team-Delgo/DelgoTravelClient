import React, { useState, useEffect } from 'react'
import { useLocation} from 'react-router-dom';
import { useSelector } from "react-redux";
import { useQuery } from 'react-query'
import { useDispatch } from 'react-redux';
import WishedPlace from './wishedPlace/WishedPlace';
import { getWishedPlaces ,getRecommendedPlace} from '../../../common/api/getPlaces';
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

interface RecommendedPlaceType {
  address: string
  checkin: string
  checkout: string
  isBooking: number
  lowestPrice: string
  mainPhotoUrl: string
  name: string
  placeId: number
  wishId: number
}

interface FolderTypeProps {
  currentTab:number
}

function Folder({currentTab}:FolderTypeProps) {
  const userId = useSelector((state: any) => state.persist.user.user.id);
  const accessToken = useSelector((state: any) => state.token.token);
  const dispatch = useDispatch();
  const location: any = useLocation();
  const { myStorageY } = useSelector((state: any) => state.persist.scroll);

  const {
    isLoading: getWishedPlacesIsLoading,
    data: wishedPlaces,
    refetch:getWishedPlacesRefetch,
  } = useQuery('getWishedPlaces', () => getWishedPlaces(accessToken, userId), {
    cacheTime: 1000 * 60 * 5,
    staleTime: 1000 * 60 * 3,
    onError: (error: any) => {
      useErrorHandlers(dispatch, error);
    },
  });

  const {
    isLoading: getRecommendedPlacesIsLoading,
    data: recommendedPlaces,
    refetch: getRecommendedPlacesRefetch,
  } = useQuery('getRecommendedPlaces', () => getRecommendedPlace(userId), {
    cacheTime: 1000 * 60 * 5,
    staleTime: 1000 * 60 * 3,
    refetchInterval: false,
    onError: (error: any) => {
      useErrorHandlers(dispatch, error);
    },
  });

  useEffect(() => {
    getWishedPlacesRefetch();
    getRecommendedPlacesRefetch();
  }, [currentTab]);


  useEffect(() => {
    if (location.state?.prevPath.includes('/detail-place')) {
      window.scrollTo(0, myStorageY);
    } else {
      window.scrollTo(0, 0);
    }
  }, [getWishedPlacesIsLoading, getRecommendedPlacesIsLoading]);

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

  if (getWishedPlacesIsLoading){
    return <div className="wish-list-container">&nbsp;</div>;
  }

  if (getRecommendedPlacesIsLoading){
    return <div className="wish-list-container">&nbsp;</div>;
  }

  return (
    <div className="wish-list-container">
      {wishedPlaces.data.length > 0 ? (
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
      {wishedPlaces.data.length > 0
        ? wishedPlaces.data
            .sort((a: WishedPlaceType, b: WishedPlaceType) => b.wishId - a.wishId)
            .map((place: WishedPlaceType) => (
              <WishedPlace
                place={place}
                key={place.placeId}
                getWishedPlacesRefetch={getWishedPlacesRefetch}
                getRecommendedPlacesRefetch={getRecommendedPlacesRefetch}
              />
            ))
        : recommendedPlaces?.data.map((place: RecommendedPlaceType) => (
            <PopularPlace place={place} key={place.placeId} getRecommendedPlacesRefetch={getRecommendedPlacesRefetch} />
          ))}
    </div>
  );
}

export default Folder;

