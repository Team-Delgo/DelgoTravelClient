import React, { useState, useCallback, useEffect,useMemo } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams, useNavigate,useLocation } from 'react-router-dom';
import classNames from 'classnames';
import { AxiosResponse } from 'axios';
import { Transition  } from 'react-transition-group';
import Skeleton , { SkeletonTheme } from 'react-loading-skeleton'
import { useQuery } from 'react-query'
import RoomType from './roomType/RoomType';
import Reviews from './reviews/Reviews';
import ImageSlider from '../../common/utils/ImageSlider';
import Map from '../../common/utils/Map';
import Heart from '../../common/components/Heart';
import { getDetailPlace} from '../../common/api/getPlaces';
import { getDetailPlaceRivews} from '../../common/api/reivew';
import { wishInsert, wishDelete } from '../../common/api/wish';
import { ReactComponent as LeftArrow } from '../../icons/left-arrow2.svg';
import { currentPlaceActions } from '../../redux/slice/placeSlice';
import { scrollActions } from '../../redux/slice/scrollSlice';
import './DetailPlace.scss';
import Calender from '../../common/utils/Calender';
import { useErrorHandlers } from '../../common/api/useErrorHandlers';

interface PhotoListType {
  detailPhotoId: number
  isMain: number
  url: string
}
interface RoomType {
  isBooking: number
  mainPhotoUrl: string
  name: string
  personMaxNum: number
  personStandardNum: number
  petMaxNum: number
  petSizeLimit: string
  petStandardNum: number
  placeId: number
  price: string
  roomId: number
}

function RoomTypeSkeletons() {
  const RoomTypeSkeletonsArray = [];
  for (let i = 0; i < 3; i += 1) {
    RoomTypeSkeletonsArray.push(
      <div className="room-type-skeleton">
        <SkeletonTheme baseColor="#f0e9e9" highlightColor="#e4dddd">
        <Skeleton style={{height:"25vh"}} borderRadius={5} />
        <Skeleton height={60} borderRadius={5} />
        </SkeletonTheme>
      </div>,
    );
  }
  return RoomTypeSkeletonsArray;
}

function DetailPlace() {
  const [isCalenderOpen, setIsCalenderOpen] = useState(false);
  const { date, dateString } = useSelector((state: any) => state.date);
  const userId = useSelector((state: any) => state.persist.user.user.id);
  const accessToken = useSelector((state: any) => state.token.token);
  const { placeId } = useParams();
  const location: any = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { whereToGoScrollY,detailPlaceScrollY,myStorageY } = useSelector((state: any) => state.persist.scroll);
  const roomTypeSkeletons = useMemo(()=>RoomTypeSkeletons(),[])
  const detailPlacePrevPath = useSelector((state: any) => state.persist.prevPath.detailPlace);
  const startDt =`${date.start.substring(0,4)}-${date.start.substring(4,6)}-${date.start.substring(6,10)}`
  const endDt = `${date.end.substring(0,4)}-${date.end.substring(4,6)}-${date.end.substring(6,10)}`

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
        '꼬강이랑 다녀왔는데 매우만족했습니다. 오션뷰에 마당잔디도 관리가 잘 되어있었어요. 사장님이 꼬강이를 너무 예뻐해주셔서 저도 정말 오기 잘했다고 생각했습니다.재방문 하고싶습니다.꼬강이랑 다녀왔는데 매우만족했습니다. 오션뷰에 마당잔디도 관리가 잘 되어있었어요. 사장님이 꼬강이를 너무 예뻐해주셔서 저도 정말 오기 잘했다고 생각했습니다. 재방문 하고싶습니다',
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
      ],
      nickName: '꼬꼬맘',
      starRating: 4,
      registrationDate: '22.02.01',
      roomUsed: '301호 (오션뷰) 객실 이용',
      reviewContent: '꼬꼬랑 다녀왔는데 매우만족했습니다. 오션뷰에 마당잔디도 관리가 잘 되어있었어요.',
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


  const { isLoading, data:detailPlace, refetch } = useQuery(
    'getDetailPlace',
    () => getDetailPlace(userId, placeId as string, startDt, endDt),
    {
      cacheTime: 1000 * 60 * 5,
      staleTime: 1000 * 60 * 3,
      refetchInterval: false,
      onError: (error: any) => {
        useErrorHandlers(dispatch, error);
      },
    },
  );

  const { data: detailPlaceRivews } = useQuery('getDetailPlaceRivews', () => getDetailPlaceRivews(placeId as string), {
    cacheTime: 1000 * 60 * 5,
    staleTime: 1000 * 60 * 3,
    refetchInterval: false,
    onError: (error: any) => {
      useErrorHandlers(dispatch, error);
    },
  });

  useEffect(() => {
    refetch()
  }, [date]); 


  useEffect(() => {
    console.log(detailPlaceRivews?.data)
    if (location.state?.prevPath.includes('/detail-place')) {
      window.scroll(0, detailPlaceScrollY);
    } else {
      window.scroll(0, 0);
    }
  }, [detailPlaceRivews]); 


  useEffect(() => {
    dispatch(
      currentPlaceActions.currentPlace({
        place: {
          placeId: detailPlace?.data.place.placeId,
          name: detailPlace?.data.place.name,
          address: detailPlace?.data.place.address,
          checkIn: detailPlace?.data.place.checkin,
          checkOut: detailPlace?.data.place.checkout,
        },
      }),
    );
  }, [detailPlace]);

  const wishListInsert = useCallback(() => {
    wishInsert(
      { userId, placeId: Number(detailPlace?.data.place.placeId), accessToken },
      (response: AxiosResponse) => {
        if (response.data.code === 200) {
          refetch()
        }
      },
      dispatch,
    );
  }, [detailPlace]);

  const wishListDelete = useCallback(() => {
    wishDelete(
      { wishId: Number(detailPlace?.data.place.wishId), accessToken },
      (response: AxiosResponse) => {
        if (response.data.code === 200) {
          refetch();
        }
      },
      dispatch,
    );
  }, [detailPlace]);

  const calenderOpenClose = useCallback(() => {
    setIsCalenderOpen(!isCalenderOpen);
  }, [isCalenderOpen]);

  const moveToMap = useCallback(() => {
    window.scroll({ top: document.body.scrollHeight, behavior: 'smooth' });
  }, []);

  const moveToPrevPage = useCallback(() => {
    if (detailPlacePrevPath === '/my-storage')
      navigate('/my-storage', {
        state: {
          prevPath: location.pathname,
        },
      });
    else if (detailPlacePrevPath === '/where-to-go')
      navigate('/where-to-go', {
        state: {
          prevPath: location.pathname,
        },
      });
    else
      navigate('/', {
        state: {
          prevPath: location.pathname,
        },
      });
  }, []);


  const saveDetailPlaceScrollY = useCallback(() => {
    dispatch(scrollActions.scroll({ whereToGo: whereToGoScrollY, detailPlace: window.scrollY, myStorage: myStorageY }));
  }, []);

  return (
    <>
      {isCalenderOpen && <Calender closeCalender={calenderOpenClose} isRoom={false} />}
      {/* <Transition in timeout={100} appear>
        {(status) => ( */}
      {/* <div
            // className={
            //   location.state.prevPath.includes('detail-place') === false
            //     ? `pageSlider pageSlider-${status}`
            //     : `pageSlider pageSlider2-${status}`
            // }
          > */}
      <div className={classNames('detail-place', { close: isCalenderOpen })}>
        <div style={{ width: '100%' }}>
          {isLoading ? (
            <SkeletonTheme baseColor="#f0e9e9" highlightColor="#e4dddd">
              <Skeleton style={{ height: '30vh' }} />
            </SkeletonTheme>
          ) : (
            <ImageSlider images={detailPlace.data.detailPhotoList} />
          )}
        </div>
        <LeftArrow className="detail-place-previous-page" onClick={moveToPrevPage} />
        <div className="detail-place-heart">
          {detailPlace?.data.place.wishId === 0 ? (
            <Heart wishList={detailPlace?.data.place.wishId} handleWishList={wishListInsert} />
          ) : (
            <Heart wishList={detailPlace?.data.place.wishId} handleWishList={wishListDelete} />
          )}
        </div>
        <div className="detail-place-info">
          <header className="detail-place-info-name">{detailPlace?.data.place.name}</header>
          <div className="detail-place-info-address">
            {detailPlace?.data.place.address}
            <span className="detail-place-info-map" aria-hidden="true" onClick={moveToMap}>
              지도 &gt;
            </span>
          </div>
          <Link
            style={{ textDecoration: 'none' }}
            to={`/detail-place/${detailPlace?.data.place.placeId}/reviews`}
            state={{ reviews }}
            key={detailPlace?.data.place.placeId}
          >
            <div className="detail-place-info-reviews">★ 9.1 리뷰 12개 &gt;</div>
          </Link>
          <div className="detail-place-info-facility">소형견,오션뷰,자연휴강,산책코스</div>
        </div>

        <div className="detail-place-reservation-date-select" aria-hidden="true" onClick={calenderOpenClose}>
          <span>날짜선택</span>
          <span className="detail-place-reservation-date-select-calender">{dateString}&nbsp;&nbsp;&nbsp;&gt;</span>
        </div>

        <div className="detail-place-room-select">
          <header className="detail-place-room-select-header">객실선택</header>
        </div>
        <div className="detail-places-room-types">
          {isLoading
            ? roomTypeSkeletons
            : detailPlace.data.roomList.map((room: RoomType) => (
                <div aria-hidden="true" onClick={saveDetailPlaceScrollY}>
                  <RoomType
                    key={room.roomId}
                    room={room}
                    checkIn={detailPlace.data.place.checkin}
                    checkOut={detailPlace.data.place.checkout}
                    navigate={() => {
                      navigate(`/detail-place/${detailPlace.data.place.placeId}/${room.roomId}`, {
                        state: {
                          room,
                        },
                      });
                    }}
                  />
                </div>
              ))}
        </div>
        <div className="detail-place-review">
          <header className="detail-place-review-header">
            <div className="detail-place-review-header-number">리뷰 {detailPlaceRivews?.data.length}개</div>
            <div aria-hidden="true" onClick={saveDetailPlaceScrollY}>
              <Link
                style={{ textDecoration: 'none' }}
                to={`/detail-place/${detailPlace?.data.place.placeId}/reviews`}
                state={{ reviews }}
                key={detailPlace?.data.place.placeId}
              >
                <div className="detail-place-review-header-more">전체보기</div>
              </Link>
            </div>
          </header>
          <body>
            {reviews.slice(0,2).map((review:any) => (
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
          {detailPlace?.data.place.address ? <Map address={detailPlace.data.place.address} /> : null}
        </div>
      </div>
      {/* </div> */}
      {/* //   )}
      // </Transition> */}
    </>
  );
}

export default DetailPlace;