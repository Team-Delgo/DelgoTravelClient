import React, { useState, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams, useNavigate,useLocation } from 'react-router-dom';
import classNames from 'classnames';
import { AxiosResponse } from 'axios';
import { Transition  } from 'react-transition-group';
import RoomType from './roomType/RoomType';
import Reviews from './reviews/Reviews';
import ImageSlider from '../../common/components/ImageSlider';
import Map from '../../common/components/Map';
import Heart from '../../common/components/Heart';
import { getDetailPlace } from '../../common/api/getPlaces';
import { wishInsert, wishDelete } from '../../common/api/wish';
import { ReactComponent as LeftArrow } from '../../icons/left-arrow2.svg';
import './DetailPlace.scss';
import Calender from '../calender/Calender';

interface PhotoListType {
  detailPhotoId: number
  isMain: number
  url: string
}

function DetailPlace() {
  const [place, setPlace] = useState({
    address: '',
    lowestPrice: '',
    mainPhotoUrl: '',
    name: '',
    placeId: '',
    registDt: '',
    wishId: 0,
  });
  const [photoList,setPhotoList] = useState<Array<PhotoListType>>([])
  const [roomTypes, setRoomTypes] = useState<Array<any>>([]);
  const [isCalenderOpen, setIsCalenderOpen] = useState(false);
  const { date, dateString } = useSelector((state: any) => state.persist.date);
  const userId = useSelector((state: any) => state.persist.user.user.id);
  const accessToken = useSelector((state: any) => state.token.token);
  const { placeId } = useParams();
  const location: any = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
        '꼬강이랑 다녀왔는데 매우만족했습니다. 오션뷰에 마당잔디도 관리가 잘 되어있었어요. 사장님이 꼬강이를 너무 예뻐해주셔서 저도 정말 오기 잘했다고 생각했습니다. 재방문 하고싶습니다',
    },
    {
      id: 2,
      profileImage: `${process.env.PUBLIC_URL}/assets/images/reviewImage.png`,
      reviewImages: [
        `${process.env.PUBLIC_URL}/assets/images/reviewImage1.png`,
        `${process.env.PUBLIC_URL}/assets/images/reviewImage1.png`,
      ],
      nickName: '꼬꼬맘',
      starRating: 4,
      registrationDate: '22.02.01',
      roomUsed: '301호 (오션뷰) 객실 이용',
      reviewContent: '꼬꼬랑 다녀왔는데 매우만족했습니다. 오션뷰에 마당잔디도 관리가 잘 되어있었어요.',
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
        '  꼬꼬랑 다녀왔는데 매우만족했습니다. 오션뷰에 마당잔디도 관리가 잘 되어있었어요. 사장님이 꼬꼬를 너무 예뻐해주셔서 저도 정말 오기 잘했다고 생각했습니다. 재방문 하고싶습니다',
    },
    {
      id: 4,
      profileImage: `${process.env.PUBLIC_URL}/assets/images/reviewImage.png`,
      reviewImages: [
        `${process.env.PUBLIC_URL}/assets/images/reviewImage1.png`,
        `${process.env.PUBLIC_URL}/assets/images/reviewImage1.png`,
      ],
      nickName: '꼬꼬맘',
      starRating: 3,
      registrationDate: '22.02.01',
      roomUsed: '301호 (오션뷰) 객실 이용',
      reviewContent:
        '  꼬꼬랑 다녀왔는데 매우만족했습니다. 오션뷰에 마당잔디도 관리가 잘 되어있었어요. 사장님이 꼬꼬를 너무 예뻐해주셔서 저도 정말 오기 잘했다고 생각했습니다. 재방문 하고싶습니다',
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
    getDetailPlace(
      { userId, placeId: Number(placeId),startDt:date.start,endDt:date.end },
      (response: AxiosResponse) => {
        setPlace(response.data.data.place);
        setPhotoList(response.data.data.detailPhotoList)
        setRoomTypes(response.data.data.roomList);
      },
      dispatch,
    );
    console.log(place)  
  }, []);

  const wishListInsert = useCallback(() => {
    wishInsert(
      { userId, placeId: Number(placeId), accessToken },
      (response: AxiosResponse) => {
        if (response.data.code === 200) {
          const updatePlace = { ...place, wishId: response.data.data.wishId };
          setPlace(updatePlace);
        }
      },
      dispatch,
    );
  }, [place]);

  const wishListDelete = useCallback(() => {
    wishDelete(
      { wishId: place.wishId, accessToken },
      (response: AxiosResponse) => {
        if (response.data.code === 200) {
          const updatePlace = { ...place, wishId: 0 };
          setPlace(updatePlace);
        }
      },
      dispatch,
    );
  }, [place]);

  const calenderOpenClose = useCallback(() => {
    setIsCalenderOpen(!isCalenderOpen);
  }, [isCalenderOpen]);

  const moveToMap = useCallback(() => {
    window.scroll({ top: document.body.scrollHeight, behavior: 'smooth' });
  }, []);

  return (
    <>
      {isCalenderOpen && <Calender closeCalender={calenderOpenClose} isRoom={false} />}
      <Transition in timeout={200} appear>
        {(status) => (
          <div className={location.state.prevPath.includes('detail-place')===false ? `pageSlider pageSlider-${status}` : `pageSlider pageSlider2-${status}`}>
            <div className={classNames('detail-place', { close: isCalenderOpen })}>
              <ImageSlider images={photoList} />
              <Link to="/where-to-go" key={place.placeId}>
                <LeftArrow className="detail-place-previous-page" />
              </Link>
              <div className="detail-place-heart">
                {place.wishId === 0 ? (
                  <Heart wishList={place.wishId} handleWishList={wishListInsert} />
                ) : (
                  <Heart wishList={place.wishId} handleWishList={wishListDelete} />
                )}
              </div>
              <div className="detail-place-info">
                <header className="detail-place-info-name">{place.name}</header>
                <div className="detail-place-info-address">
                  {place.address}
                  <span className="detail-place-info-map" aria-hidden="true" onClick={moveToMap}>
                    지도 &gt;
                  </span>
                </div>
                <Link
                  style={{ textDecoration: 'none' }}
                  to={`/detail-place/${placeId}/reviews`}
                  state={{ reviews }}
                  key={placeId}
                >
                  <div className="detail-place-info-reviews">★ 9.1 리뷰 12개 &gt;</div>
                </Link>
                <div className="detail-place-info-facility">소형견,오션뷰,자연휴강,산책코스</div>
              </div>

              <div className="detail-place-reservation-date-select" aria-hidden="true" onClick={calenderOpenClose}>
                <span>날짜선택</span>
                <span className="detail-place-reservation-date-select-calender">
                  {dateString}&nbsp;&nbsp;&nbsp;&gt;
                </span>
              </div>

              <div className="detail-place-room-select">
                <header className="detail-place-room-select-header">객실선택</header>
              </div>
              <div className="detail-places-room-types">
                {roomTypes.map((room) => (
                  <RoomType
                    key={room.id}
                    room={room}
                    navigate={() => {
                      navigate(`/detail-place/${placeId}/${room.roomId}`, {
                        state: {
                          room,
                          place,
                        },
                      });
                    }}
                  />
                ))}
              </div>
              <div className="detail-place-review">
                <header className="detail-place-review-header">
                  <div className="detail-place-review-header-number">리뷰 {reviews.length}개</div>
                  <Link
                    style={{ textDecoration: 'none' }}
                    to={`/detail-place/${placeId}/reviews`}
                    state={{ reviews }}
                    key={placeId}
                  >
                    <div className="detail-place-review-header-more">더보기</div>
                  </Link>
                </header>
                <body>
                  {reviews.slice(0, 2).map((review) => (
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
                {
                  place.address ? <Map address={place.address} />
                  : null
                }
              </div>
            </div>
          </div>
        )}
      </Transition>
    </>
  );
}

export default DetailPlace;
