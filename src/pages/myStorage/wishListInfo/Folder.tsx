import React, {  useEffect } from 'react'
import { useLocation} from 'react-router-dom';
import { useSelector } from "react-redux";
import { useQuery } from 'react-query'
import { useDispatch } from 'react-redux';
import WishedPlace from './wishedPlace/WishedPlace';
import { getWishedPlaces ,getRecommendedPlace} from '../../../common/api/places';
import RecommendedPlace from '../../../common/components/RecommendedPlace'
import { useErrorHandlers } from '../../../common/api/useErrorHandlers';
import { GET_RECOMMENED_PLACES, GET_WISHED_PLACES, CACHE_TIME, STALE_TIME } from '../../../common/constants/queryKey.const'
import {RootState} from '../../../redux/store'
import { errorActions } from '../../../redux/slice/errorSlice';
import { ReactComponent as FootPrintActive } from '../../../common/icons/foot-print-active.svg';
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

const loadingScreenHeight = { height: window.innerHeight * 100 }

function Folder({currentTab}:FolderTypeProps) {
  const userId = useSelector((state: RootState) => state.persist.user.user.id);
  const { myStorageScrollY } = useSelector((state: RootState) => state.persist.scroll);
  const dispatch = useDispatch();
  const location: any = useLocation();
  

  const {
    isLoading: getWishedPlacesIsLoading,
    data: wishedPlaces,
    refetch: getWishedPlacesRefetch,
  } = useQuery(GET_WISHED_PLACES, () => getWishedPlaces(userId), {
    cacheTime: CACHE_TIME,
    staleTime: STALE_TIME,
    onError: (error: any) => {
      useErrorHandlers(dispatch, error);
    },
  });

  const {
    isLoading: getRecommendedPlacesIsLoading,
    data: recommendedPlaces,
    refetch: getRecommendedPlacesRefetch,
  } = useQuery(GET_RECOMMENED_PLACES, () => getRecommendedPlace(userId), {
    cacheTime: CACHE_TIME,
    staleTime: STALE_TIME,
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
      window.scrollTo(0, myStorageScrollY);
    } else {
      window.scrollTo(0, 0);
    }
  }, [getWishedPlacesIsLoading, getRecommendedPlacesIsLoading]);

  if (getWishedPlacesIsLoading||getRecommendedPlacesIsLoading){
    return <div className="wish-list-container" style={loadingScreenHeight}>&nbsp;</div>;
  }

  return (
    <div className="wish-list-container">
      {wishedPlaces?.data?.length > 0 ? (
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
      {wishedPlaces?.data?.length > 0
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
        : recommendedPlaces.data.map((place: RecommendedPlaceType) => (
            <RecommendedPlace place={place} key={place.placeId} getRecommendedPlacesRefetch={getRecommendedPlacesRefetch} currentTab={currentTab}/>
          ))}
    </div>
  );
}

export default Folder;

