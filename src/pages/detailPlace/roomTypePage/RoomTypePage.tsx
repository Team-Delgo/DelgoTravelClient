import React, { useCallback, useState, useEffect } from 'react';
import classNames from 'classnames';
import { useNavigate, useLocation, Link ,useParams} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Transition  } from 'react-transition-group';
import { AxiosResponse } from 'axios';
import { reservationActions } from '../../../redux/reducers/reservationSlice';
import { getRoomData } from '../../../common/api/getRoom';
import ImageSlider from '../../../common/utils/ImageSlider';
import BottomButton from '../../../common/components/BottomButton';
import { ReactComponent as LeftArrow } from '../../../icons/left-arrow2.svg';
import Calender from '../../../common/utils/Calender';
import { currentRoomActions } from '../../../redux/reducers/roomSlice';
import { scrollActions } from '../../../redux/reducers/scrollSlice';
import './RoomTypePage.scss';


interface PhotoListType {
  detailPhotoId: number
  isMain: number
  url: string
}


function RoomTypePage() {
  const navigate = useNavigate();
  const { date, dateString } = useSelector((state: any) => state.date);
  const { currentPlace } = useSelector((state: any) => state.persist.currentPlace);
  const { user } = useSelector((state: any) => state.persist.user);
  const dispatch = useDispatch();
  const location: any = useLocation();
  const [isCalenderOpen, setIsCalenderOpen] = useState(false);
  const { room } = location.state;
  const [photoList, setPhotoList] = useState<Array<PhotoListType>>([]);

  const [service, setService] = useState<Array<any>>([
    `${process.env.PUBLIC_URL}/assets/images/service1.png`,
    `${process.env.PUBLIC_URL}/assets/images/service2.png`,
    `${process.env.PUBLIC_URL}/assets/images/service3.png`,
    `${process.env.PUBLIC_URL}/assets/images/service4.png`,
    `${process.env.PUBLIC_URL}/assets/images/service5.png`,
    `${process.env.PUBLIC_URL}/assets/images/service6.png`,
  ]);

  useEffect(() => {
    window.scrollTo(0, 0);
    getRoomData(
      room?.roomId,
      (response: AxiosResponse) => {
        setPhotoList(response.data.data.detailRoomPhotos);
      },
      dispatch,
    );
  }, []);

  useEffect(() => {
    dispatch(
      currentRoomActions.currentRoom({
        room: {
          roomId: room?.roomId,
          name: room?.name,
          price: room?.price,
        },
      }),
    );
  }, [room]);

  const calenderOpenClose = useCallback(() => {
    setIsCalenderOpen(!isCalenderOpen);
  }, [isCalenderOpen]);

  const handleReservation = () => {
    dispatch(
      reservationActions.reservation({
        user: { id: user.id, nickname: user.nickname, email: user.email, phone: user.phone },
        place: {
          placeId: currentPlace.placeId,
          name: currentPlace.name,
          address: currentPlace.address,
        },
        room: {
          roomId: room.roomId,
          name: room.name,
          price: room.price,
        },
        date: {
          date,
          dateString
        },
      }),
    );
    setTimeout(() => {
      navigate(`/reservation/${currentPlace.placeId}/${room.roomId}/${date.start}/${date.end}`);
    }, 300);
  };




  return (
    <>
      {isCalenderOpen && <Calender closeCalender={calenderOpenClose} isRoom roomId={room.roomId} />}
      {/* <Transition in timeout={100} appear>
        {(status) => (
          <div className={`pageSlider pageSlider-${status}`}> */}
            <div className={classNames('detail-place-room-type', { close: isCalenderOpen })}>
              <ImageSlider images={photoList} />
              <Link
                to={`/detail-place/${currentPlace.placeId}`}
                state={{ prevPath: location.pathname }}
                key={currentPlace.placeId}
              >
                <LeftArrow className="detail-place-room-type-previous-page" />
              </Link>
              <div className="detail-place-room-type-info">
                <header className="detail-place-room-type-info-name">{room.name}</header>
                <div className="detail-place-room-type-info-accommodation">
                  <div className="detail-place-room-type-info-accommodation-check-in-check-out">
                    입실 {currentPlace.checkIn.substring(0, 5)} / 퇴실 {currentPlace.checkOut.substring(0, 5)}
                  </div>
                  <div className="detail-place-room-type-info-accommodation-price">{room.price}</div>
                </div>
              </div>
              <div
                className="detail-place-room-type-reservation-date-select"
                aria-hidden="true"
                onClick={calenderOpenClose}
              >
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
          {/* </div>
        )}
      </Transition> */}
      <div className="reservation-button" aria-hidden="true" onClick={handleReservation}>
        <BottomButton text="예약하기" />
      </div>
    </>
  );
}

export default RoomTypePage;
