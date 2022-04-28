import React, { useState } from 'react';
import PopularPlace from './PopularPlace/PopularPlace';
import TravelHisotryPlace from './TravelHisotryPlace/TravelHisotryPlace';
import './History.scss';

type PopularPlaceType = {
  id: number;
  image: string;
  name: string;
  location: string;
};
type TravelHisotryPlaceType = {
  id: number,
  period: string,
  image: string,
  name: string,
  address: string
  package: string
};

function History() {
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
      address:"강원도 속초시 조앙동",
      package:"슈페리어 더블룸 조식포함패키지"
    },
    {
      id: 2,
      period: "03.02-03.04",
      image: `${process.env.PUBLIC_URL}/assets/images/recommendedPlaceImage.png`,
      name: '멍멍이네 하우스',
      address:"강원도 속초시 조앙동",
      package:"슈페리어 더블룸 조식포함패키지"
    },
    {
      id: 3,
      period: "03.02-03.04",
      image: `${process.env.PUBLIC_URL}/assets/images/recommendedPlaceImage.png`,
      name: '멍멍이네 하우스',
      address:"강원도 속초시 조앙동",
      package:"슈페리어 더블룸 조식포함패키지"
    },
  ]);
  return (
    <div className="travel-history-container">
      {travelHisotryPlace.length > 0 ? (
        <div className="travel-history-profile">
          <img
            className="travel-history-profile-image"
            src={`${process.env.PUBLIC_URL}/assets/images/profileImage.png`}
            alt="profile-img"
          />
          <div className="travel-history-profile-figures">
            <div className="travel-history-profile-figures-days">
              Traveled <strong>31</strong> days
            </div>
            <div className="travel-history-profile-figures-places">
              Stayed <strong>12</strong> Places
            </div>
          </div>
        </div>
      ) : (
        <div className="travel-history-notice">
          <div className="travel-history-notice-main">아직 여행 기록이 없어요</div>
          <div className="travel-history-notice-sub">인기 숙소를 보여드릴게요</div>
        </div>
      )}
      {travelHisotryPlace.length > 0 
        ? travelHisotryPlace.map((place) => <TravelHisotryPlace place={place} key={place.id} />)
        : popularPlace.map((place) => <PopularPlace place={place} key={place.id} />)}
    </div>
  );
}

export default History;
