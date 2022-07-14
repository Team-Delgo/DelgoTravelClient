
import React from 'react'
import { Link } from 'react-router-dom';
import './TravelHistoryPlace.scss';

interface TraveledHisotryPlaceTypeProps {
  traveledPlace:TraveledHisotryPlaceType
}

interface TraveledHisotryPlaceType {
  bookingId: string,
  roomName: string,
  roomId:number,
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

function TravelHisotryPlace({ traveledPlace }: TraveledHisotryPlaceTypeProps) {
  return (
    <div className="travel-hisotry-place">
      <div className="travel-hisotry-place-period">{traveledPlace.startDt.substring(5, 7)}.{traveledPlace.startDt.substring(8, 10)} - {traveledPlace.endDt.substring(5, 7)}.{traveledPlace.endDt.substring(8, 10)}</div>
      <div className="travel-hisotry-place-info">
        <img
          className="travel-hisotry-place-info-image"
          src={traveledPlace.place.mainPhotoUrl}
          alt="travel-place-img"
        />
        <div className="travel-hisotry-place-info-detail">
          <div className="travel-hisotry-place-info-detail-name">{traveledPlace.place.name}</div>
          <div className="travel-hisotry-place-info-detail-address">{traveledPlace.place.address}</div>
          <div className="travel-hisotry-place-info-detail-package">{traveledPlace.roomName}</div>
        </div>
      </div>
      <div className="travel-hisotry-place-review">
        <Link className="travel-hisotry-place-review-link" to={`/review-writing/${traveledPlace.place.placeId}`} state={traveledPlace}> 
          <div className="travel-hisotry-place-review-write">리뷰쓰기</div>
        </Link>
        <div className="travel-hisotry-place-review-reservation-detail">예약상세</div>
      </div>
    </div>
  );
}

export default TravelHisotryPlace;