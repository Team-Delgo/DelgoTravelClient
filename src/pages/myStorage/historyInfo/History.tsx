import React, { useEffect, useState } from 'react';
import { useNavigate , useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AxiosResponse } from 'axios';
import { useQuery } from 'react-query'
import { tokenActions } from '../../../redux/slice/tokenSlice';
import { tokenRefresh } from '../../../common/api/login';
import { getRecommendedPlace } from '../../../common/api/places';
import { getBookingHistory } from '../../../common/api/booking';
import { useErrorHandlers } from '../../../common/api/useErrorHandlers';
import {RootState} from '../../../redux/store';
import RecommendedPlace from '../../../common/components/RecommendedPlace';
import TravelHisotryPlace from './travelHistoryPlace/TravelHistoryPlace';
import { ReactComponent as FootPrintActive } from '../../../icons/foot-print-active.svg';
import './History.scss';

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
interface TravelHisotryPlaceType {
  bookingId: string,
  roomName: string,
  roomId:number,
  startDt: string,
  endDt: string,
  reviewExisting: boolean,
  place: {
    address: string
    checkin: string
    checkout: string
    isBooking: 0
    lowestPrice: null
    mainPhotoUrl: string
    name: string
    placeId: number
    wishId: number
  },
}

interface FolderTypeProps {
  currentTab:number
}

function History({currentTab}:FolderTypeProps) {
  const navigation = useNavigate();
  const dispatch = useDispatch();
  const accessToken = useSelector((state: RootState) => state.token.token);
  const refreshToken = localStorage.getItem('refreshToken') || '';
  const userId = useSelector((state: RootState) => state.persist.user.user.id);
  const location: any = useLocation();
  const { myStorageScrollY } = useSelector((state: RootState) => state.persist.scroll);

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

  const { isLoading: getTraveledPlacesIsLoading, data: traveledPlaces } = useQuery(
    'getTraveledPlaces',
    () => getBookingHistory(userId),
    {
      cacheTime: 1000 * 60 * 5,
      staleTime: 1000 * 60 * 3,
      refetchInterval: false,
      onError: (error: any) => {
        useErrorHandlers(dispatch, error);
      },
    },
  );

  useEffect(() => {
    getRecommendedPlacesRefetch();
  }, [currentTab,traveledPlaces]);

  useEffect(() => {
    if (location.state?.prevPath.includes('/reservation-history')) {
      window.scrollTo(0, myStorageScrollY);
    }
    else if (location.state?.prevPath.includes('/review-writing')) {
      window.scrollTo(0, myStorageScrollY);
    }
    else if (location.state?.prevPath.includes('/detail-place')) {
      window.scrollTo(0, myStorageScrollY);
    } 
    else {
      window.scrollTo(0, 0);
    }
  }, [getRecommendedPlacesIsLoading, getTraveledPlacesIsLoading]);

  if (getRecommendedPlacesIsLoading || getTraveledPlacesIsLoading)
    return <div className="travel-history-container">&nbsp;</div>;

  return (
    <div className="travel-history-container">
      {traveledPlaces?.data.length > 0 ? (
        <div className="travel-history-number">델고 갔던 {traveledPlaces?.data.length}개 장소</div>
      ) : (
        <div className="travel-history-notice">
          <FootPrintActive className="travel-history-notice-foot-print" />
          <div className="travel-history-notice-main">여행내역이 없어요</div>
          <div className="travel-history-notice-sub">이번 주말 델고가요</div>
        </div>
      )}
      {traveledPlaces?.data.length > 0
        ? traveledPlaces?.data.map((place: TravelHisotryPlaceType) => (
          <TravelHisotryPlace traveledPlace={place} key={place.bookingId} />
        ))
        : recommendedPlaces?.data.map((place: RecommendedPlaceType) => (
          <RecommendedPlace place={place} key={place.placeId} getRecommendedPlacesRefetch={getRecommendedPlacesRefetch} currentTab={currentTab}/>
        ))}
    </div>
  );
}

export default History;
