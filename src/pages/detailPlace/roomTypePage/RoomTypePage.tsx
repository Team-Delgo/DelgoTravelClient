import React, { useCallback, useState, useEffect } from 'react';
import classNames from 'classnames';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { AxiosResponse } from 'axios';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import RoomTypeNotice from './roomNotice/RoomTypeNotice';
import { reservationActions } from '../../../redux/slice/reservationSlice';
import { getRoomData } from '../../../common/api/room';
import ImageSlider from '../../../common/utils/ImageSlider';
import BottomButton from '../../../common/components/BottomButton';
import AlertConfirm from '../../../common/dialog/AlertConfirm';
import { SIGN_IN_PATH } from '../../../common/constants/path.const';
import { ReactComponent as LeftArrow } from '../../../common/icons/left-arrow2.svg';
import Calender from '../../../common/utils/Calender';
import { RoomImgType } from '../../../common/types/room';
import { RoomNoticeType } from '../../../common/types/notice';
import { currentRoomActions } from '../../../redux/slice/roomSlice';
import { RootState } from '../../../redux/store';
import './RoomTypePage.scss';


function RoomTypePage() {
  const navigate = useNavigate();
  const { date, dateString } = useSelector((state: RootState) => state.date);
  const { currentPlace } = useSelector((state: RootState) => state.persist.currentPlace);
  const { user, isSignIn } = useSelector((state: RootState) => state.persist.user);
  const dispatch = useDispatch();
  const location: any = useLocation();
  const [isCalenderOpen, setIsCalenderOpen] = useState(false);
  const [logInModalOpen, setLogInModalOpen] = useState(false);
  const { room } = location.state;
  const [photoList, setPhotoList] = useState<Array<RoomImgType>>([]);
  const [roomNoticeList, setRoomNoticeList] = useState<Array<RoomNoticeType>>([]);

  console.log('room',room)

  useEffect(() => {
    window.scrollTo(0, 0);
    getRoomData(
      room?.roomId,
      (response: AxiosResponse) => {
        setPhotoList(response.data.data.detailRoomPhotos);
        setRoomNoticeList(response.data.data.roomNoticeList);
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
          personStandardNum: room?.personStandardNum,
        },
      }),
    );
  }, [room]);


  const calenderOpenClose = useCallback(() => {
    setIsCalenderOpen(!isCalenderOpen);
  }, [isCalenderOpen]);

  const handleReservation = () => {
    if (isSignIn) {
      console.log('room',room)
      dispatch(
        reservationActions.reservation({
          user: { id: user.id, email: user.email, phone: user.phone },
          place: {
            placeId: currentPlace.placeId,
            name: currentPlace.name,
            address: currentPlace.address,
          },
          room: {
            roomId: room.roomId,
            name: room.name,
            price: room.price,
            personStandardNum: room.personStandardNum,
          },
          date: {
            date,
            dateString,
            checkIn: currentPlace.checkIn.substring(0, 5),
            checkOut: currentPlace.checkOut.substring(0, 5),
          },
        }),
      );
      setTimeout(() => {
        navigate(`/reservation/${currentPlace.placeId}/${room.roomId}/${date.start}/${date.end}`);
      }, 100);
    } else {
      setLogInModalOpen(true);
    }
  };

  return (
    <>
      {isCalenderOpen && <Calender closeCalender={calenderOpenClose} isRoom roomId={room.roomId} />}
      {logInModalOpen && (
        <AlertConfirm
          text="로그인 후 이용 할 수 있습니다."
          buttonText="로그인"
          noButtonHandler={() => {
            setLogInModalOpen(false);
          }}
          yesButtonHandler={() => {
            navigate(SIGN_IN_PATH.MAIN);
          }}
        />
      )}
      <div className={classNames('detail-place-room-type', { close: isCalenderOpen })}>
        {photoList.length > 0 ? (
          <ImageSlider images={photoList} />
        ) : (
          <SkeletonTheme baseColor="#f0e9e9" highlightColor="#e4dddd">
            <Skeleton className="detail-place-room-type-image-skeleton" />
          </SkeletonTheme>
        )}
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
        <div className="detail-place-room-type-reservation-date-select" aria-hidden="true" onClick={calenderOpenClose}>
          <span>날짜선택</span>
          <span className="detail-place-room-type-reservation-date-select-calender">
            {dateString}&nbsp;&nbsp;&nbsp;&gt;
          </span>
        </div>
        {roomNoticeList.map((roomNotice: RoomNoticeType) => (
          <RoomTypeNotice roomNotice={roomNotice} key={roomNotice.roomNoticeId} />
          // <div className="detail-place-room-type-notice">
          //   <div className="detail-place-room-type-notice-title">{notice.title}</div>
          //   <div className="detail-place-room-type-notice-content">
          //     {notice.contents.map((content: string, index: number) => (
          //       <div>* {content}</div>
          //     ))}
          //   </div>
          // </div>
        ))}
        <div className="reservation-button" aria-hidden="true" onClick={handleReservation}>
          <BottomButton text="예약하기" />
        </div>
      </div>
    </>
  );
}

export default RoomTypePage;
