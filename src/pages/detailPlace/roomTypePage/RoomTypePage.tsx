import React, { useCallback, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import ReservationButton from '../reservationButton/ReservationButton';
import { CALENDER_PATH } from '../../../constants/path.const';
import { ReactComponent as LeftArrow } from '../../../icons/left-arrow.svg';

import './RoomTypePage.scss';

function RoomTypePage() {
  const navigate = useNavigate();
  const [service, setService] = useState<Array<any>>([
    `${process.env.PUBLIC_URL}/assets/images/service1.png`,
    `${process.env.PUBLIC_URL}/assets/images/service2.png`,
    `${process.env.PUBLIC_URL}/assets/images/service3.png`,
    `${process.env.PUBLIC_URL}/assets/images/service4.png`,
    `${process.env.PUBLIC_URL}/assets/images/service5.png`,
    `${process.env.PUBLIC_URL}/assets/images/service6.png`,
  ]);

  const moveToPreviousPage = useCallback(() => {
    navigate(-1);
  }, []);

  return (
    <>
      <div className="detail-place-room-type">
        <img
          className="detail-place-room-type-main-image"
          src={`${process.env.PUBLIC_URL}/assets/images/detailPlaceImage.jpg`}
          alt="place-img"
        />
        <LeftArrow className="detail-place-room-type-previous-page" onClick={moveToPreviousPage} />
        <div className="detail-place-room-type-info">
          <header className="detail-place-room-type-info-name">디럭스 더블</header>
          <div className="detail-place-room-type-info-accommodation">
            <div className="detail-place-room-type-info-accommodation-check-in-check-out">입실 15:00 / 퇴실 12:00</div>
            <div className="detail-place-room-type-info-accommodation-price">360,000원</div>
          </div>
        </div>
        <Link style={{ textDecoration: 'none' }} to={CALENDER_PATH}>
          <div className="detail-place-room-type-reservation-date-select">
            <span>날짜선택</span>
            <span className="detail-place-room-type-reservation-date-select-calender">
              11.14 수 - 11.15 목&nbsp;&nbsp;&nbsp;&gt;
            </span>
          </div>
        </Link>
        <div className="detail-place-room-type-facility">
          <header className="detail-place-room-type-facility-header">편의시설</header>
          <div className="detail-place-room-type-facility-image-container">
            {service.map((url) => (
              <img src={url} alt="service-img" />
            ))}
          </div>
        </div>
        <div className="detail-place-room-type-notice">공지사항</div>
        <div className="detail-place-room-type-base-information">기본정보</div>
        <div className="detail-place-room-type-additional-personnel-information">인원 추가 정보</div>
      </div>
      <ReservationButton />
    </>
  );
}

export default RoomTypePage;
