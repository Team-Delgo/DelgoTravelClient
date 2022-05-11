import React, { useState,useCallback,useEffect } from 'react';
import { useSelector } from "react-redux";
import { Link, useParams,useNavigate } from 'react-router-dom';
import { AxiosResponse } from 'axios';
import RoomType from './roomType/RoomType';
import Reviews from './reviews/Reviews';
import ReservationButton from './reservationButton/ReservationButton';
import Map from '../../common/components/Map'
import Heart from '../../common/components/Heart'
import {getDetailPlace} from '../../common/api/getPlaces'
import {wishInsert,wishDelete} from '../../common/api/wish'
import { CALENDER_PATH} from '../../constants/path.const';
import { ReactComponent as LeftArrow } from '../../icons/left-arrow.svg'

import './DetailPlace.scss';

function DetailPlace() {
  const [test,setTest] = useState<Array<any>>([])
  const [wishList, setWishList] = useState(0);
  const userId = useSelector((state: any) => state.persist.user.user.id);
  const { placeId } = useParams();
  const navigate  = useNavigate();
 

  const [roomTypes, setRoomTypes] = useState<Array<any>>([
    {
      id: 1,
      image: `${process.env.PUBLIC_URL}/assets/images/recommendedPlaceImage.png`,
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
      roomUsed: '103호 (오션뷰) 객실 이용',
      reviewContent:
        '  꼬강이랑 다녀왔는데 매우만족했습니다. 오션뷰에 마당잔디도 관리가 잘 되어있었어요. 사장님이 꼬강이를 너무 예뻐해주셔서 저도 정말 오기 잘했다고 생각했습니다. 재방문 하고싶습다',
    },
    {
      id: 2,
      profileImage: `${process.env.PUBLIC_URL}/assets/images/reviewImage.png`,
      reviewImages: [
        `${process.env.PUBLIC_URL}/assets/images/reviewImage1.png`,
        `${process.env.PUBLIC_URL}/assets/images/reviewImage1.png`,
      ],
      nickName: '꼬꼬맘',
      starRating: 5,
      registrationDate: '22.02.01',
      roomUsed: '301호 (오션뷰) 객실 이용',
      reviewContent:
        '  꼬꼬랑 다녀왔는데 매우만족했습니다. 오션뷰에 마당잔디도 관리가 잘 되어있었어요. 사장님이 꼬꼬를 너무 예뻐해주셔서 저도 정말 오기 잘했다고 생각했습니다. 재방문 하고싶습다',
    },
    {
      id: 3,
      profileImage: `${process.env.PUBLIC_URL}/assets/images/reviewImage.png`,
      reviewImages: [
        `${process.env.PUBLIC_URL}/assets/images/reviewImage1.png`,
        `${process.env.PUBLIC_URL}/assets/images/reviewImage1.png`,
      ],
      nickName: '꼬꼬맘',
      starRating: 5,
      registrationDate: '22.02.01',
      roomUsed: '301호 (오션뷰) 객실 이용',
      reviewContent:
        '  꼬꼬랑 다녀왔는데 매우만족했습니다. 오션뷰에 마당잔디도 관리가 잘 되어있었어요. 사장님이 꼬꼬를 너무 예뻐해주셔서 저도 정말 오기 잘했다고 생각했습니다. 재방문 하고싶습다',
    },
    {
      id: 4,
      profileImage: `${process.env.PUBLIC_URL}/assets/images/reviewImage.png`,
      reviewImages: [
        `${process.env.PUBLIC_URL}/assets/images/reviewImage1.png`,
        `${process.env.PUBLIC_URL}/assets/images/reviewImage1.png`,
      ],
      nickName: '꼬꼬맘',
      starRating: 5,
      registrationDate: '22.02.01',
      roomUsed: '301호 (오션뷰) 객실 이용',
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
    `${process.env.PUBLIC_URL}/assets/images/service6.png`,
  ]);

  useEffect(() => {
    window.scrollTo(0, 0);

    getDetailPlace({ userId, placeId: Number(placeId) }, (response: AxiosResponse) => {
      setTest(response.data.data);
      console.log(response.data.data);
    });
  }, []);

  const wishListInsert = useCallback(() => {
    setWishList(1);
    // wishInsert({ userId, placeId: place.placeId }, (response: AxiosResponse) => {
    //   if (response.data.code === 200) {
    //     const updatePlace = { ...place, wishId: response.data.data.wishId };
    //     const updatePlaces = places.map((p) => (p.placeId === updatePlace.placeId ? { ...p, ...updatePlace } : p));
    //     setPlaces(updatePlaces);
    //     setWishList(response.data.data.wishId);
    //   }
    // });
  }, [wishList]);

  const wishListDelete = useCallback(() => {
    setWishList(0);
    // wishDelete({ wishId: wishList }, (response: AxiosResponse) => {
    //   if (response.data.code === 200) {
    //     const updatePlace = { ...place, wishId: 0 };
    //     const updatePlaces = places.map((p) => (p.placeId === updatePlace.placeId ? { ...p, ...updatePlace } : p));
    //     setPlaces(updatePlaces);
    //     setWishList(0);
    //   }
    // });
  }, [wishList]);

  const moveToPreviousPage = useCallback(() => {
    navigate(-1)
  },[]);

  return (
    <>
      <div className="detail-place">
        <img
          className="detail-place-main-image"
          src={`${process.env.PUBLIC_URL}/assets/images/detailPlaceImage.jpg`}
          alt="place-img"
        />
        <LeftArrow className="detail-place-previous-page" onClick={moveToPreviousPage}/>
        <div className="detail-place-heart">
          {wishList === 0 ? (
            <Heart wishList={wishList} handleWishList={wishListInsert} />
          ) : (
            <Heart wishList={wishList} handleWishList={wishListDelete} />
          )}
        </div>
        <div className="detail-place-info">
          <header className="detail-place-info-name">밸런스독</header>
          <div className="detail-place-info-address">
            경기도 양평균 지평면<span className="detail-place-info-map">지도 &gt;</span>
          </div>
          <div className="detail-place-info-reviews">★ 9.1 리뷰 12개 &gt;</div>
          <div className="detail-place-info-facility">소형견,오션뷰,자연휴강,산책코스</div>
        </div>
        <Link style={{ textDecoration: 'none' }} to={CALENDER_PATH}>
          <div className="detail-place-reservation-date-select">
            <span>날짜선택</span>
            <span className="detail-place-reservation-date-select-calender">
              11.14 수 - 11.15 목&nbsp;&nbsp;&nbsp;&gt;
            </span>
          </div>
        </Link>
        <div className="detail-place-room-select">
          <header className="detail-place-room-select-header">객실선택</header>
        </div>
        <div className="detail-places-room-types">
          {roomTypes.map((room) => (
            <Link style={{ textDecoration: 'none' }} to={`/detail-place/${placeId}/${room.id}`}>
              <RoomType key={room.id} room={room} />
            </Link>
          ))}
        </div>
        <div className="detail-place-review">
          <header className="detail-place-review-header">
            <span className="detail-place-review-header-number">리뷰 {reviews.length}개</span>
            <Link
              style={{ textDecoration: 'none' }}
              to={`/detail-place/${placeId}/reviews`}
              state={{ reviews }}
              key={placeId}
            >
              <span className="detail-place-review-header-more">더보기</span>
            </Link>
          </header>
          <body>
            {reviews.map((review) => (
              <Reviews key={review.id} review={review} />
            ))}
          </body>
        </div>
        <div className="detail-place-facility">
          <header className="detail-place-facility-header">편의시설 및 서비스</header>
          <div className="detail-place-facility-image-container">
            {service.map((url) => (
              <img src={url} alt="service-img" />
            ))}
          </div>
        </div>
        <div className="detail-place-notice">공지사항</div>
        <div className="detail-place-base-information">기본정보</div>
        <div className="detail-place-additional-personnel-information">인원 추가 정보</div>
        <div className="detail-place-cancellation-refund-policy">취소 및 환불 규정</div>
        <div className="detail-place-etc">확인사항 및 기타</div>
        <div className="detail-place-map">
          <header className="detail-place-map-header">지도</header>
          <Map />
        </div>
      </div>
      <ReservationButton />
    </>
  );
}

export default DetailPlace;
