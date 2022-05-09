import React,{useState} from 'react';
import RoomType from './roomType/RoomType';
import Reviews from './reviews/Reviews';
import ReservationButton from './reservationButton/ReservationButton';
import './DetailPlace.scss';

function DetailPlace() {
  const [roomTypes, setRoomTypes] = useState<Array<any>>([
    {
      id: 1,
      image: `${process.env.PUBLIC_URL}/assets/images/whereToGoImage.png`,
      name: '스탠다드',
      lowestPrice: '190.000',
      max_person: 2,
      max_dog: 3,
    },
    {
      id: 2,
      image: `${process.env.PUBLIC_URL}/assets/images/whereToGoImage.png`,
      name: '디럭스 더블',
      lowestPrice: '250.000',
      max_person: 4,
      max_dog: 2,
    },
    {
      id: 3,
      image: `${process.env.PUBLIC_URL}/assets/images/whereToGoImage.png`,
      name: '프리미어',
      lowestPrice: '350.000',
      max_person: 5,
      max_dog: 6,
    },
  ]);

  const [reviews, setReviews] = useState<Array<any>>([
    {
      id: 1,
      profileImage: `${process.env.PUBLIC_URL}/assets/images/reviewImage.png`,
      reviewImages: [
        `${process.env.PUBLIC_URL}/assets/images/reviewImage1.png`,
        `${process.env.PUBLIC_URL}/assets/images/reviewImage1.png`,
      ],
      nickName: '꼬강맘',
      starRating: 5,
      registrationDate: '22.03.01',
      roomUsed: '103호 (오션뷰)객실 이용',
      reviewContent:
        '  꼬강이랑 다녀왔는데 매우만족했습니다. 오션뷰에 마당잔디도 관리가 잘 되어있었어요. 사장님이 꼬강이를 너무 예뻐해주셔서 저도 정말 오기 잘했다고 생각했습니다. 재방문 하고싶습다',
    },
    {
      id: 1,
      profileImage: `${process.env.PUBLIC_URL}/assets/images/reviewImage.png`,
      reviewImages: [
        `${process.env.PUBLIC_URL}/assets/images/reviewImage1.png`,
        `${process.env.PUBLIC_URL}/assets/images/reviewImage1.png`,
      ],
      nickName: '꼬꼬맘',
      starRating: 5,
      registrationDate: '22.02.01',
      roomUsed: '301호 (오션뷰)객실 이용',
      reviewContent:
        '  꼬꼬랑 다녀왔는데 매우만족했습니다. 오션뷰에 마당잔디도 관리가 잘 되어있었어요. 사장님이 꼬꼬를 너무 예뻐해주셔서 저도 정말 오기 잘했다고 생각했습니다. 재방문 하고싶습다',
    },
  ]);

  const [service, setService] = useState<Array<any>>([
    `${process.env.PUBLIC_URL}/assets/images/service1.png`,
    `${process.env.PUBLIC_URL}/assets/images/service2.png`,
    `${process.env.PUBLIC_URL}/assets/images/service3.png`,
    `${process.env.PUBLIC_URL}/assets/images/service4.png`,
    `${process.env.PUBLIC_URL}/assets/images/service5.png`,
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
      <div className="detail-place-review">
        <header>
          <span className="detail-place-review-count">리뷰 21개</span>
          <span className="detail-place-review-more">더보기</span>
        </header>
        <body>
          {reviews.map((review) => (
            <Reviews key={review.id} review={review} />
          ))}
        </body>
      </div>
      <div>편의시설 및 서비스</div>
      {service.map((url) => (
        <img src={url} alt="service-img" />
      ))}
      <div>공지사항</div>
      <div>기본정보</div>
      <div>인원 추가 정보</div>
      <div>취소 및 환불 규정</div>

      <ReservationButton />
    </div>
  );
}

export default DetailPlace;
