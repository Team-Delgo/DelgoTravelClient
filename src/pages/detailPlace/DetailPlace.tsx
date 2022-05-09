import React,{useState} from 'react';
import RoomType from './roomType/RoomType';
import ReservationButton from './reservationButton/ReservationButton';
import './DetailPlace.scss';

function DetailPlace() {
  const [roomTypes, setRoomTypes] = useState<Array<any>>([
    {
      id: 1,
      image: `${process.env.PUBLIC_URL}/assets/images/whereToGoImage.png`,
      name: '스탠다드',
      lowestPrice:"190.000",
      max_person: 2,
      max_dog: 3,
    },
    {
      id: 2,
      image: `${process.env.PUBLIC_URL}/assets/images/whereToGoImage.png`,
      name: '디럭스 더블',
      lowestPrice:"250.000",
      max_person: 4,
      max_dog: 2,
    },
    {
      id: 3,
      image: `${process.env.PUBLIC_URL}/assets/images/whereToGoImage.png`,
      name: '프리미어',
      lowestPrice:"350.000",
      max_person: 5,
      max_dog: 6,
    },
  ]);

  return (
    <div className="detail-place">
      <img
        className="detail-place-main-image"
        src={`${process.env.PUBLIC_URL}/assets/images/detailPlaceImage.jpg`}
        alt="place-img"
      />
      <div className="detail-place-info">
        <header>밸런스독</header>
        <div>경기도 양평균 지평면 지도</div>
        <div>★ 9.1 리뷰 12개</div>
        <div>소형견,오션뷰,자연휴강,산책코스</div>
      </div>
      <div className="detail-place-reservation-date-select">
        <span>날짜선택</span>
        <span>11.14 수 - 11.15 목</span>
      </div>
      <div className="detail-place-room-select">
        <header>객실선택</header> 
      </div>
      <div className="places-container">
        {roomTypes.map((room) => (
          <RoomType key={room.id} room={room} />
        ))}
      </div>
      <ReservationButton />
    </div>
  );
}

export default DetailPlace;
