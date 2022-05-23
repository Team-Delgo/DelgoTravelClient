import React, { useCallback, useState, useEffect } from 'react';
import classNames from 'classnames';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ImageSlider from '../../../common/components/ImageSlider';
import BottomButton from '../../../common/layouts/BottomButton';
import { ReactComponent as LeftArrow } from '../../../icons/left-arrow2.svg';
import Calender from '../../calender/Calender';
import './RoomTypePage.scss';

function RoomTypePage() {
  const navigate = useNavigate();
  const { date, dateString } = useSelector((state: any) => state.date);
  const [isCalenderOpen, setIsCalenderOpen] = useState(false);
  const [service, setService] = useState<Array<any>>([
    `${process.env.PUBLIC_URL}/assets/images/service1.png`,
    `${process.env.PUBLIC_URL}/assets/images/service2.png`,
    `${process.env.PUBLIC_URL}/assets/images/service3.png`,
    `${process.env.PUBLIC_URL}/assets/images/service4.png`,
    `${process.env.PUBLIC_URL}/assets/images/service5.png`,
    `${process.env.PUBLIC_URL}/assets/images/service6.png`,
  ]);
  const room = useLocation().state as any;

  const [roomImg, setRoomImg] = useState<Array<any>>([
    `${process.env.PUBLIC_URL}/assets/images/detailPlaceImage.jpg`,
    `${process.env.PUBLIC_URL}/assets/images/detailPlaceImage.jpg`,
    `${process.env.PUBLIC_URL}/assets/images/detailPlaceImage.jpg`
  ]);
  


  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const moveToPreviousPage = useCallback(() => {
    navigate(-1);
  }, []);

  const calenderOpenClose = useCallback(() => {
    setIsCalenderOpen(!isCalenderOpen);
  },[isCalenderOpen])

  return (
    <>
      {isCalenderOpen && <Calender closeCalender={calenderOpenClose} />}
      <div className={classNames('detail-place-room-type', { close: isCalenderOpen })}>
        <ImageSlider images={roomImg}/>
        <LeftArrow className="detail-place-room-type-previous-page" onClick={moveToPreviousPage} />
        <div className="detail-place-room-type-info">
          <header className="detail-place-room-type-info-name">{room.name}</header>
          <div className="detail-place-room-type-info-accommodation">
            <div className="detail-place-room-type-info-accommodation-check-in-check-out">
              입실 {room.checkin} / 퇴실 {room.checkout}
            </div>
            <div className="detail-place-room-type-info-accommodation-price">{room.price}</div>
          </div>
        </div>
        <div className="detail-place-room-type-reservation-date-select" aria-hidden="true" onClick={calenderOpenClose}>
          <span>날짜선택</span>
          <span className="detail-place-room-type-reservation-date-select-calender">
            {dateString}&nbsp;&nbsp;&nbsp;&gt;
          </span>
        </div>
        <div className="detail-place-room-type-facility">
          <header className="detail-place-room-type-facility-header">편의시설</header>
          <div className="detail-place-room-type-facility-image-container">
            {service.map((url) => (
              <img src={url} alt="service-img" key={url} />
            ))}
          </div>
        </div>
        <div className="detail-place-room-type-notice">공지사항</div>
        <div className="detail-place-room-type-base-information">기본정보</div>
        <div className="detail-place-room-type-additional-personnel-information">인원 추가 정보</div>
      </div>
      <BottomButton text="예약하기" />
    </>
  );
}

export default RoomTypePage;
