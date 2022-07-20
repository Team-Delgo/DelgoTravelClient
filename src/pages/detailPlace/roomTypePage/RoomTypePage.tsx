import React, { useCallback, useState, useEffect } from 'react';
import classNames from 'classnames';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Transition  } from 'react-transition-group';
import { AxiosResponse } from 'axios';
import Skeleton , { SkeletonTheme } from 'react-loading-skeleton'
import { reservationActions } from '../../../redux/slice/reservationSlice';
import { getRoomData } from '../../../common/api/getRoom';
import ImageSlider from '../../../common/utils/ImageSlider';
import BottomButton from '../../../common/components/BottomButton';
import { ReactComponent as LeftArrow } from '../../../icons/left-arrow2.svg';
import Calender from '../../../common/utils/Calender';
import { currentRoomActions } from '../../../redux/slice/roomSlice';
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
  const { currentRoom } = useSelector((state: any) => state.persist.currentRoom);
  const { user } = useSelector((state: any) => state.persist.user);
  const dispatch = useDispatch();
  const location: any = useLocation();
  const [isCalenderOpen, setIsCalenderOpen] = useState(false);
  const { room } = location.state;
  const [photoList, setPhotoList] = useState<Array<PhotoListType>>([]);
  const [roomNoticeList,setRoomNoticeList] = useState<Array<any>>([])

  const [service, setService] = useState<Array<any>>([
    `${process.env.PUBLIC_URL}/assets/images/service1.png`,
    `${process.env.PUBLIC_URL}/assets/images/service2.png`,
    `${process.env.PUBLIC_URL}/assets/images/service3.png`,
    `${process.env.PUBLIC_URL}/assets/images/service4.png`,
    `${process.env.PUBLIC_URL}/assets/images/service5.png`,
    `${process.env.PUBLIC_URL}/assets/images/service6.png`,
  ]);

  useEffect(() => {
    console.log(room)
    window.scrollTo(0, 0);
    getRoomData(
      room?.roomId,
      (response: AxiosResponse) => {
        setPhotoList(response.data.data.detailRoomPhotos);
        setRoomNoticeList(response.data.data.roomNoticeList)
      },
      dispatch,
    );
  }, [room]);

  useEffect(() => {
    dispatch(
      currentRoomActions.currentRoom({
        room: {
          roomId: room?.roomId,
          name: room?.name,
          price: room?.price,
          petNum:room?.petStandardNum,
          personNum:room?.personStandardNum
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
          roomId: currentRoom.roomId,
          name: currentRoom.name,
          price: currentRoom.price,
          petNum:currentRoom.petNum,
          personNum:currentRoom.personNum
        },
        date: {
          date,
          dateString,
          checkIn:currentPlace.checkIn.substring(0, 5),
          checkOut:currentPlace.checkOut.substring(0, 5)
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
        {photoList.length > 0 ? 
          <ImageSlider images={photoList} />
         : 
          <SkeletonTheme baseColor="#f0e9e9" highlightColor="#e4dddd">
            <Skeleton className="detail-place-room-type-image-skeleton"/>
          </SkeletonTheme>
        }
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
            <div className="detail-place-room-type-info-accommodation-price">{currentRoom.price}</div>
          </div>
        </div>
        <div className="detail-place-room-type-reservation-date-select" aria-hidden="true" onClick={calenderOpenClose}>
          <span>날짜선택</span>
          <span className="detail-place-room-type-reservation-date-select-calender">
            {dateString}&nbsp;&nbsp;&nbsp;&gt;
          </span>
        </div>
        {/* {
          roomNoticeList.map((notice: any) =>
            <div className="detail-place-notice">
              <div className="detail-place-notice-title">{notice.title}</div>
              <div className="detail-place-notice-content">{notice.contents.map((content: any, index: number) => <div>{index + 1}.{content}</div>)}</div>
            </div>)
        } */}
                {
          roomNoticeList.map((notice: any) =>
            <div className="detail-place-room-type-notice">
              <div className="detail-place-room-type-notice-title">{notice.title}</div>
              <div className="detail-place-room-type-notice-content">{notice.contents.map((content: any, index: number) => <div>{index + 1}.{content}</div>)}</div>
            </div>)
        }
        <div className="reservation-button" aria-hidden="true" onClick={handleReservation}>
          <BottomButton text="예약하기" />
        </div>
      </div>
      {/* </div>
        )}
      </Transition> */}
    </>
  );
}

export default RoomTypePage;
