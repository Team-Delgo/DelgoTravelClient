import React, { useState } from 'react';
import PopularPlace from './PopularPlace';
import './History.scss';

type PopularPlaceType = {
  id: number;
  image: string;
  name: string;
  location: string;
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
  return (
    <div className="history-container">
      <div className="history-notice">
        <div className="history-notice-main">아직 여행 기록이 없어요</div>
        <div className="history-notice-sub">인기 숙소를 보여드릴게요</div>
      </div>
      {popularPlace.map((place) => (
        <PopularPlace place={place} key={place.id} />
      ))}
    </div>
  );
}

export default History;
