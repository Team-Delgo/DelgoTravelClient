
import React from 'react'
import { Link } from 'react-router-dom';
import './TravelHistoryPlace.scss';

type TravelHisotryPlaceTypeProps = {
    place:TravelHisotryPlaceType
}

type TravelHisotryPlaceType = {
    id: number,
    period: string,
    image: string,
    name: string,
    address: string
    package: string
  }

function TravelHisotryPlace({ place }: TravelHisotryPlaceTypeProps) {
  return (
    <div className="travel-hisotry-place">
      <div className="travel-hisotry-place-period">{place.period}</div>
      <div className="travel-hisotry-place-info">
        <img
          className="travel-hisotry-place-info-image"
          src={`${process.env.PUBLIC_URL}/assets/images/recommendedPlaceImage.png`}
          alt="travel-place-img"
        />
        <div className="travel-hisotry-place-info-detail">
          <div className="travel-hisotry-place-info-detail-name">{place.name}</div>
          <div className="travel-hisotry-place-info-detail-address">{place.address}</div>
          <div className="travel-hisotry-place-info-detail-package">{place.package}</div>
        </div>
      </div>
      <div className="travel-hisotry-place-review">
        <div className="travel-hisotry-place-review-etc">···</div>
        <Link className="travel-hisotry-place-review-link" to={`/review-writing/${place.id}`} state={place}> 
          <div className="travel-hisotry-place-review-write">리뷰쓰기</div>
        </Link>
        <div className="travel-hisotry-place-review-reservation-detail">예약상세</div>
      </div>
    </div>
  );
}

export default TravelHisotryPlace;