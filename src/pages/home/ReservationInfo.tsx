import React from 'react'
import Dog from '../../icons/dog.svg';
import Airplane from '../../icons/airplane.svg';
import Footprint from '../../icons/footprint.svg';
import Book from '../../icons/book.svg';
import Emergency from '../../icons/emergency.svg'
import './ReservationInfo.scss';

function ReservationInfo() {
  return (
    <div className="home-background">
      <div className="reservation">
        <img src={`${process.env.PUBLIC_URL}/assets/images/recommendedPlaceImage.png`} alt="" />
        <div className="reservation-place-name">제주 멍멍하우스</div>
        <div className="reservation-deadline">D-4</div>
        <div className="reservation-date">11/4 Tue - 11/8 Sat</div>
        <div className="reservation-time">
          <div className="reservation-time-checkin">
            <div className="reservation-checkin-letter">Check in</div>
            <div className="reservation-checkin-number">15:00</div>
          </div>
          <div className="reservation-check-out">
            <div className="reservation-checkout-letter">Check out</div>
            <div className="reservation-checkout-number">12:00</div>
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
            <img src={Emergency} alt="" />
            &nbsp;응급상황
          </div>
          <div>
            <img src={Dog} alt="" />
            &nbsp;여행펫티켓
          </div>
          <div>
            <img src={Airplane} alt="" />
            &nbsp;비행기탑승
          </div>
          <div>
            <img src={Footprint} alt="" />
            &nbsp;필수준비물
          </div>
          <div>
            <img src={Book} alt="" />
            &nbsp;기초상식
          </div>
        </div>
      </div>
      <div className="recommended-places-around-reserved-place">
        <img src={`${process.env.PUBLIC_URL}/assets/images/recommendedPlacesAroundReservedPlace.png`} alt="" />
        <div className="recommended-places-information-around-reserved-place">
          <div className="recommended-places-name-around-reserved-place">멍멍카페 강릉점</div>
          <div className="recommended-places-loaction-around-reserved-place">숙소에서 3.2 km</div>
          {/* <div className="recommended-places-review-around-reserved-place">
              애기들이랑 놀기 좋아요 강아지 방석도 있어요
          </div>   */}
        </div>
      </div>
    </div>
  );
}

export default ReservationInfo;