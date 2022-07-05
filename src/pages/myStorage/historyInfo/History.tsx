import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AxiosResponse } from 'axios';
import { tokenActions } from '../../../redux/reducers/tokenSlice';
import { tokenRefresh } from '../../../common/api/login';
import PopularPlace from './popularPlace/PopularPlace';
import TravelHisotryPlace from './travelHistoryPlace/TravelHistoryPlace';
import { ReactComponent as FootPrintActive } from '../../../icons/foot-print-active.svg';
import './History.scss';

interface PopularPlaceType  {
  id: number;
  image: string;
  name: string;
  location: string;
};
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
  const [hasTravelHistorys, setHasTravelHistorys] = useState(false);
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


  return (
    <div className="travel-history-container">
      {hasTravelHistorys === true ? (
        <div className="travel-history-number">
          델고 갔던 3개 장소
        </div>
      ) : (
        <div className="travel-history-notice">
          <FootPrintActive className="travel-history-notice-foot-print"/>
          <div className="travel-history-notice-main">여행내역이 없어요</div>
          <div className="travel-history-notice-sub">이번 주말 델고가요</div>
        </div>
      )}
      {hasTravelHistorys === true
        ? travelHisotryPlace.map((place) => <TravelHisotryPlace place={place} key={place.id} />)
        : popularPlace.map((place) => <PopularPlace place={place} key={place.id} />)}
    </div>
  );
}

export default History;
