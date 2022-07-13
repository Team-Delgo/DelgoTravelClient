
import React from 'react'
import { Link } from 'react-router-dom';
import './TravelHistoryPlace.scss';

type TravelHisotryPlaceTypeProps = {
    place:TravelHisotryPlaceType
}

interface TravelHisotryPlaceType {
  bookingId: string,
  roomName: string,
  startDt: string,
  endDt: string,
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

function TravelHisotryPlace({ place }: TravelHisotryPlaceTypeProps) {
  return (
    <div className="travel-hisotry-place">
      <div className="travel-hisotry-place-period">{place.startDt.substring(5, 7)}.{place.startDt.substring(8, 10)} - {place.endDt.substring(5, 7)}.{place.endDt.substring(8, 10)}</div>
      <div className="travel-hisotry-place-info">
        <img
          className="travel-hisotry-place-info-image"
          src={place.place.mainPhotoUrl}
          alt="travel-place-img"
        />
        <div className="travel-hisotry-place-info-detail">
          <div className="travel-hisotry-place-info-detail-name">{place.place.name}</div>
          <div className="travel-hisotry-place-info-detail-address">{place.place.address}</div>
          <div className="travel-hisotry-place-info-detail-package">{place.roomName}</div>
        </div>
      </div>
      <div className="travel-hisotry-place-review">
        <div className="travel-hisotry-place-review-etc">···</div>
        <Link className="travel-hisotry-place-review-link" to={`/review-writing/${place.place.placeId}`} state={place.place}> 
          <div className="travel-hisotry-place-review-write">리뷰쓰기</div>
        </Link>
        <div className="travel-hisotry-place-review-reservation-detail">예약상세</div>
      </div>
    </div>
  );
}

export default TravelHisotryPlace;