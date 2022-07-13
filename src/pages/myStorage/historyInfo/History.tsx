import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AxiosResponse } from 'axios';
import { useQuery } from 'react-query'
import { tokenActions } from '../../../redux/slice/tokenSlice';
import { tokenRefresh } from '../../../common/api/login';
import { getRecommendedPlace } from '../../../common/api/getPlaces';
import { getBookingHistory } from '../../../common/api/booking';
import { useErrorHandlers } from '../../../common/api/useErrorHandlers';
import PopularPlace from './popularPlace/PopularPlace';
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
  id: number,
  period: string,
  image: string,
  name: string,
  address: string
  package: string
};

function History() {
  const navigation = useNavigate();
  const dispatch = useDispatch();
  const accessToken = useSelector((state: any) => state.token.token);
  const refreshToken = localStorage.getItem('refreshToken') || '';
  const userId = useSelector((state: any) => state.persist.user.user.id);
  const [hasTravelHistorys, setHasTravelHistorys] = useState(false);
  const [travelHisotryPlace, seTravelHisotryPlace] = useState<Array<TravelHisotryPlaceType>>([
    {
      id: 1,
      period: "03.02-03.04",
      image: `${process.env.PUBLIC_URL}/assets/images/recommendedPlaceImage.png`,
      name: '멍멍이네 하우스',
      address: "강원도 속초시 조앙동",
      package: "슈페리어 더블룸 조식포함패키지"
    },
    {
      id: 2,
      period: "03.02-03.04",
      image: `${process.env.PUBLIC_URL}/assets/images/recommendedPlaceImage.png`,
      name: '멍멍이네 하우스',
      address: "강원도 속초시 조앙동",
      package: "슈페리어 더블룸 조식포함패키지"
    },
    {
      id: 3,
      period: "03.02-03.04",
      image: `${process.env.PUBLIC_URL}/assets/images/recommendedPlaceImage.png`,
      name: '멍멍이네 하우스',
      address: "강원도 속초시 조앙동",
      package: "슈페리어 더블룸 조식포함패키지"
    },
  ]);

  const { isLoading: getRecommendedPlacesIsLoading, data: recommendedPlaces } = useQuery('getRecommendedPlaces', () => getRecommendedPlace(userId), {
    cacheTime: 1000 * 60 * 5,
    staleTime: 1000 * 60 * 3,
    refetchInterval: false,
    onError: (error: any) => {
      useErrorHandlers(dispatch, error);
    },
  });

  const { isLoading:getTraveledPlacesIsLoading, data: traveledPlaces } = useQuery('getTraveledPlaces', () => getBookingHistory(userId), {
    cacheTime: 1000 * 60 * 5,
    staleTime: 1000 * 60 * 3,
    refetchInterval: false,
    onSuccess: () => {
      console.log(traveledPlaces)
    },
    onError: (error: any) => {
      useErrorHandlers(dispatch, error);
    },
  });

  useEffect(() => {
    tokenRefresh({ refreshToken }, (response: AxiosResponse) => {
      const { code } = response.data;

      if (code === 200) {
        const accessToken = response.headers.authorization_access;
        const refreshToken = response.headers.authorization_refresh;

        dispatch(tokenActions.setToken(accessToken),);
        localStorage.setItem('refreshToken', refreshToken);
      }
      else {
        navigation('/user/signin');
      }
    }, dispatch);
  }, [accessToken]);


  if (getRecommendedPlacesIsLoading||getTraveledPlacesIsLoading)
    return (
      <div className="travel-history-container">
        &nbsp;
      </div>
    );


  return (
    <div className="travel-history-container">
      {traveledPlaces?.data !==null ? (
        <div className="travel-history-number">
          델고 갔던 {traveledPlaces.data.length}개 장소
        </div>
      ) : (
        <div className="travel-history-notice">
          <FootPrintActive className="travel-history-notice-foot-print" />
          <div className="travel-history-notice-main">여행내역이 없어요</div>
          <div className="travel-history-notice-sub">이번 주말 델고가요</div>
        </div>
      )}
      {traveledPlaces?.data !==null
        ? traveledPlaces?.data.map((place:any) => <TravelHisotryPlace place={place} key={place.id} />)
        : recommendedPlaces?.data.map((place: RecommendedPlaceType) => <PopularPlace place={place} key={place.placeId} />)}
    </div>
  );
}

export default History;
