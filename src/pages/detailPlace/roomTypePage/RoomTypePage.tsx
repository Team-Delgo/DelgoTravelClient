import React, { useCallback, useState, useEffect } from 'react';
import classNames from 'classnames';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Transition  } from 'react-transition-group';
import { reservationActions } from '../../../redux/reducers/reservationSlice';
import ImageSlider from '../../../common/components/ImageSlider';
import BottomButton from '../../../common/components/BottomButton';
import { ReactComponent as LeftArrow } from '../../../icons/left-arrow2.svg';
import Calender from '../../calender/Calender';
import './RoomTypePage.scss';

function RoomTypePage() {
  const navigate = useNavigate();
  const { date, dateString } = useSelector((state: any) => state.persist.date);
  const dispatch = useDispatch();
  const [isCalenderOpen, setIsCalenderOpen] = useState(false);

  const [service, setService] = useState<Array<any>>([
    `${process.env.PUBLIC_URL}/assets/images/service1.png`,
    `${process.env.PUBLIC_URL}/assets/images/service2.png`,
    `${process.env.PUBLIC_URL}/assets/images/service3.png`,
    `${process.env.PUBLIC_URL}/assets/images/service4.png`,
    `${process.env.PUBLIC_URL}/assets/images/service5.png`,
    `${process.env.PUBLIC_URL}/assets/images/service6.png`,
  ]); 
  const {room,place} = useSelector((state: any) => state.persist.reservation);


  const [roomImg, setRoomImg] = useState<Array<any>>([
    `${process.env.PUBLIC_URL}/assets/images/detailPlaceImage.jpg`,
    `${process.env.PUBLIC_URL}/assets/images/detailPlaceImage.jpg`,
    `${process.env.PUBLIC_URL}/assets/images/detailPlaceImage.jpg`,
  ]);


  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);


  const calenderOpenClose = useCallback(() => {
    setIsCalenderOpen(!isCalenderOpen);

  }, [isCalenderOpen]);

  const handleReservation = () => {
    dispatch(
      reservationActions.reservation({
        place: { placeId: place.placeId, name: place.name, address: place.address },
        room: {
          roomId: room.roomId,
          name: room.name,
          checkin: room.checkin,
          checkout: room.checkout,
          price: room.price,
          images: room.detailPhotos,
        },
      }),
    );
    setTimeout(() => {
      navigate(`/reservation/${room.placeId}/${room.roomId}/${date.start}/${date.end}`);
    }, 300);
  };

  return (
    <>
      {isCalenderOpen && <Calender closeCalender={calenderOpenClose} isRoom roomId={room.roomId} />}
      <Transition in timeout={200} appear>
        {(status) => (
          <div className={`pageSlider pageSlider-${status}`}>
      <div className={classNames('detail-place-room-type', { close: isCalenderOpen })}>
        <ImageSlider images={roomImg} />
        <Link to={`/detail-place/${place.placeId}`} key={place.placeId}>
        <LeftArrow className="detail-place-room-type-previous-page"/>
        </Link>
        <div className="detail-place-room-type-info">
          <header className="detail-place-room-type-info-name">{room.name}</header>
          <div className="detail-place-room-type-info-accommodation">
            <div className="detail-place-room-type-info-accommodation-check-in-check-out">
              입실 {room.checkin.substring(0, 5)} / 퇴실 {room.checkout.substring(0, 5)}
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
      <div aria-hidden="true" onClick={handleReservation}>
        <BottomButton text="예약하기" />
      </div>
      </div>
        )}
      </Transition>
    </>
  );
}

export default RoomTypePage;
