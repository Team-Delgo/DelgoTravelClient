import React,{useState} from 'react';
import Dog from '../../../icons/dog.svg';
import Airplane from '../../../icons/airplane.svg';
import Footprint from '../../../icons/footprint.svg';
import Book from '../../../icons/book.svg';
import Emergency from '../../../icons/emergency.svg'
import './ReservationInfo.scss';

interface ReservationInfoType  {
  id: number
  image:string
  placeName:string
  deadLine:number 
  date:string 
  checkInTime:string 
  checkOutTime:string 
}
interface RecommendedPlaceType {
  id: number
  image:string
  name:string
  distanceFromReservationPlace:string
  review:string
}

function ReservationInfo() {

  const [reservationInfo, setReservationInfo] =  useState<ReservationInfoType>(
    {
      id:1,
      image: `${process.env.PUBLIC_URL}/assets/images/recommendedPlaceImage.png`,
      placeName: '제주 멍멍하우스',
      deadLine:4,
      date:"11/4 Tue - 11/8 Sat",
      checkInTime:"15:00",
      checkOutTime:"12:00" 

    }
  )
  const [recommendedPlace, setRecommendedPlace] =  useState<Array<RecommendedPlaceType>>(
    [{
      id:1,
      image: `${process.env.PUBLIC_URL}/assets/images/recommendedPlacesAroundReservedPlace.png`,
      name:"멍멍카페 강릉점",
      distanceFromReservationPlace:"3.2km",
      review:"애기들이랑 놀기 좋아요 강아지 방석도 있어요"
    },
    {
      id:2,
      image: `${process.env.PUBLIC_URL}/assets/images/recommendedPlacesAroundReservedPlace.png`,
      name:"멍멍카페 강릉점",
      distanceFromReservationPlace:"3.2km",
      review:"애기들이랑 놀기 좋아요 강아지 방석도 있어요"
    }
  ]
  )

  return (
    <div className="home-background">
      <div className="reservation">
        <img src={reservationInfo.image} alt="reservation-place-img" />
        <div className="reservation-place-name">{reservationInfo.placeName}</div>
        <div className="reservation-deadline">{`D-${reservationInfo.deadLine}`}</div>
        <div className="reservation-date">{reservationInfo.date}</div>
        <div className="reservation-stay-time">
          <div className="reservation-check-in">
            <div className="reservation-check-in-letter">Check in</div>
            <div className="reservation-check-in-number">{reservationInfo.checkInTime}</div>
          </div>
          <div className="reservation-check-out">
            <div className="reservation-check-out-letter">Check out</div>
            <div className="reservation-check-out-number">{reservationInfo.checkOutTime}</div>
          </div>
        </div>
        <div className="reservation-information">
          <div className="reservation-information-address">주소</div>
          <div className="reservation-information-inquiry">문의</div>
          <div className="reservation-information-change">예약변경</div>
          <div className="reservation-information-cancel">예약취소</div>
        </div>
      </div>
      <div className="travel-preparation">
        <div className="travel-preparation-text">여행준비 되셨나요?</div>
        <div className="travel-preparation-list">
          <div>
            <img src={Emergency} alt="emergency" />
            &nbsp;응급상황
          </div>
          <div>
            <img src={Dog} alt="dog" />
            &nbsp;여행펫티켓
          </div>
          <div>
            <img src={Airplane} alt="airplane" />
            &nbsp;비행기탑승
          </div>
          <div>
            <img src={Footprint} alt="footprint" />
            &nbsp;필수준비물
          </div>
          <div>
            <img src={Book} alt="book" />
            &nbsp;기초상식
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReservationInfo;