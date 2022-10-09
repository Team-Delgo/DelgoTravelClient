import React, { useState, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams, useNavigate,useLocation } from 'react-router-dom';
import classNames from 'classnames';
import { AxiosResponse } from 'axios';
import { useQuery } from 'react-query'
import RoomType from './roomType/RoomType';
import Review from './review/Review';
import ImageSlider from '../../common/utils/ImageSlider';
import Map from '../../common/utils/Map';
import AlertConfirm from '../../common/dialog/AlertConfirm';
import {
  ROOT_PATH,
  MY_STORAGE_PATH,
  WHERE_TO_GO_PATH,
  SIGN_IN_PATH,
} from '../../common/constants/path.const';
import {RootState} from '../../redux/store'
import { ReactComponent as ActiveHeart } from '../../common/icons/heart-active.svg';
import { ReactComponent as Heart } from '../../common/icons/heart.svg';
import { getDetailPlace} from '../../common/api/places';
import { getDetailPlaceRivews} from '../../common/api/reivew';
import { wishInsert, wishDelete } from '../../common/api/wish';
import { ReactComponent as LeftArrow } from '../../common/icons/left-arrow2.svg';
import { currentPlaceActions } from '../../redux/slice/placeSlice';
import { scrollActions } from '../../redux/slice/scrollSlice';
import Calender from '../../common/utils/Calender';
import { useErrorHandlers } from '../../common/api/useErrorHandlers';
import { GET_DETAIL_PLACE, GET_DETAIL_PLACE_REVIEWS, CACHE_TIME, STALE_TIME } from '../../common/constants/queryKey.const'
import PlaceNotice from './PlaceNotice/PlaceNotice'
import './DetailPlacePage.scss';

interface RivewType {
  placeName: string
  profileUrl: string
  review: {
    bookingId: string
    placeId: number
    rating: number
    registDt: string
    reviewId: number
    roomId: number
    text: string
    updateDt: null
    userId: number
    reviewPhotoList: Array<ReviewPhotoType>
  };
  roomName: string
  userName: string
}

interface ReviewPhotoType {
  registDt: string
  reviewPhotoId: number
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

interface NoticeType {
  contents:Array<string>
  placeId: number
  placeNoticeId: number
  title:string
}

declare global {
  interface Window {
    BRIDGE: any;
    webkit: any;
    Kakao: any;
  }
}

function DetailPlacePage() {
  const [isCalenderOpen, setIsCalenderOpen] = useState(false);
  const [logInModalOpen, setLogInModalOpen] = useState(false);
  const { date, dateString } = useSelector((state: RootState) => state.date);
  const userId = useSelector((state: RootState) => state.persist.user.user.id);
  const isSignIn = useSelector((state: RootState) => state.persist.user.isSignIn);
  const OS = useSelector((state: RootState) => state.persist.device.OS);
  const detailPlacePrevPath = useSelector((state: RootState) => state.persist.prevPath.detailPlacePrevPath);
  const { whereToGoScrollY, detailPlaceScrollY, myStorageScrollY } = useSelector(
    (state: RootState) => state.persist.scroll,
  );
  const { placeId } = useParams();
  const location: any = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const startDt = `${date.start.substring(0, 4)}-${date.start.substring(4, 6)}-${date.start.substring(6, 10)}`;
  const endDt = `${date.end.substring(0, 4)}-${date.end.substring(4, 6)}-${date.end.substring(6, 10)}`;

  const {
    isLoading: getDetailPlaceIsLoading,
    data: detailPlace,
    refetch:getDetailPlaceRefetch,
  } = useQuery(GET_DETAIL_PLACE, () => getDetailPlace(userId, placeId as string, startDt, endDt), {
    cacheTime: CACHE_TIME,
    staleTime: STALE_TIME,
    refetchInterval: false,
    onError: (error: any) => {
      useErrorHandlers(dispatch, error);
    },
  });

  const { isLoading: getDetailPlaceIsReviewsLoading, data: detailPlaceRivews } = useQuery(
    GET_DETAIL_PLACE_REVIEWS,
    () => getDetailPlaceRivews(placeId as string),
    {
      cacheTime: CACHE_TIME,
      staleTime: STALE_TIME,
      refetchInterval: false,
      onError: (error: any) => {
        useErrorHandlers(dispatch, error);
      },
    },
  );

  useEffect(() => {
    getDetailPlaceRefetch();
  }, [date]);


  useEffect(() => {
    if (location.state?.prevPath?.includes('/detail-place')) {
      window.scroll(0, detailPlaceScrollY);
    }
    else{
      window.scroll(0, 0);
    } 
  }, [detailPlace,detailPlaceRivews]); 


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

  const wishListInsert = () => {
    if (isSignIn) {
      wishInsert(
        { userId, placeId: Number(placeId) },
        dispatch,
        (response: AxiosResponse) => {
          if (response.data.code === 200) {
            getDetailPlaceRefetch();
          }
        },
      );
      if (OS === 'android') {
        window.BRIDGE.vibrate();
      } else {
        window.webkit.messageHandlers.vibrate.postMessage('');
      }
    } else {
      setLogInModalOpen(true);
    }
  };

  const wishListDelete = () => {
    wishDelete(
      { wishId: Number(detailPlace?.data.place.wishId) },
      dispatch,
      (response: AxiosResponse) => {
        if (response.data.code === 200) {
          getDetailPlaceRefetch();
        }
      }
    );
  };

  const calenderOpenClose = useCallback(() => {
    setIsCalenderOpen(!isCalenderOpen);
  }, [isCalenderOpen]);

  const moveToMap = useCallback(() => {
    window.scroll({ top: document.body.scrollHeight, behavior: 'smooth' });
  }, []);

  const moveToPrevPage = useCallback(() => {
    if (detailPlacePrevPath.toString() === MY_STORAGE_PATH)
      navigate(MY_STORAGE_PATH, {
        state: {
          prevPath: location.pathname,
          myStorageTab:location.state
        },
      });
    else if (detailPlacePrevPath.toString() === WHERE_TO_GO_PATH)
      navigate(WHERE_TO_GO_PATH, {
        state: {
          prevPath: location.pathname,
        },
      });
    else
      navigate(ROOT_PATH, {
        state: {
          prevPath: location.pathname,
        },
      });
  }, []);


  const saveDetailPlaceScrollY = useCallback(() => {
    dispatch(
      scrollActions.scroll({ whereToGo: whereToGoScrollY, detailPlace: window.scrollY, myStorage: myStorageScrollY }),
    );
  }, []);

  if (getDetailPlaceIsLoading || getDetailPlaceIsReviewsLoading) {
    return <div className='detail-place'>&nbsp;</div>;
  }

  return (
    <>
      {isCalenderOpen && <Calender closeCalender={calenderOpenClose} isRoom={false} />}
      {logInModalOpen && <AlertConfirm
        text="로그인 후 이용 할 수 있습니다."
        buttonText='로그인'
        noButtonHandler={() => {
          setLogInModalOpen(false);
        }}
        yesButtonHandler={() => {
          navigate(SIGN_IN_PATH.MAIN);
        }}
      />}
      <div className={classNames('detail-place', { close: isCalenderOpen })}>
        <div style={{ width: '100%' }}>
            <ImageSlider images={detailPlace?.data.detailPhotoList} />
        </div>
        <LeftArrow className="detail-place-previous-page" onClick={moveToPrevPage} />
        <div className="detail-place-heart">
          {detailPlace?.data.place.wishId === 0 ? (
            <Heart onClick={wishListInsert} />
          ) : (
            <ActiveHeart onClick={wishListDelete} />
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
          {detailPlaceRivews?.data && (
            <Link
              style={{ textDecoration: 'none' }}
              to={`/detail-place/${detailPlace?.data.place.placeId}/reviews`}
              state={{ reviews: detailPlaceRivews.data.readReviewDTOList }}
              key={detailPlace?.data.place.placeId}
            >
              <span className="detail-place-info-reviews">
                ★ {detailPlaceRivews.data.ratingAvg} 리뷰 {detailPlaceRivews?.data?.readReviewDTOList.length}개 &gt;
              </span>
            </Link>
          )}
          <div className="detail-place-info-facility">{detailPlace?.data.place.conceptTag}</div>
        </div>
        {detailPlace?.data.isEditorNoteExist === true ? (
          <Link
            className="editor-thumbnail"
            to={`/editor-note/${detailPlace?.data.place.placeId}`}
            state={{ placeId: detailPlace?.data.place.placeId }}
            key={detailPlace?.data.place.placeId}
          >
            <div className="detail-place-delgo-note">Delgo 노트 보러가기</div>
          </Link>
        ) : null}
        <div className="detail-place-reservation-date-select" aria-hidden="true" onClick={calenderOpenClose}>
          <span>날짜선택</span>
          <span className="detail-place-reservation-date-select-calender">{dateString}&nbsp;&nbsp;&nbsp;&gt;</span>
        </div>

        <div className="detail-place-room-select">
          <header className="detail-place-room-select-header">객실선택</header>
        </div>
        <div className="detail-place-room-types">
          {
          detailPlace?.data.roomList.map((room: RoomType) => (
                <div aria-hidden="true" onClick={saveDetailPlaceScrollY}>
                  <RoomType
                    key={room.roomId}
                    room={room}
                    navigate={() => {
                      navigate(`/detail-place/${detailPlace?.data.place.placeId}/${room.roomId}`, {
                        state: {
                          room,
                        },
                      });
                    }}
                  />
                </div>
              ))}
        </div>
        {detailPlaceRivews?.data && (
          <div className="detail-place-review">
            <header className="detail-place-review-header">
              <div className="detail-place-review-header-number">
                리뷰 {detailPlaceRivews?.data?.readReviewDTOList.length}개
              </div>
              <div aria-hidden="true" onClick={saveDetailPlaceScrollY}>
                <Link
                  style={{ textDecoration: 'none' }}
                  to={`/detail-place/${detailPlace?.data.place.placeId}/reviews`}
                  state={{ reviews: detailPlaceRivews.data.readReviewDTOList, reviewsAvg: detailPlaceRivews.data.ratingAvg }}
                  key={detailPlace?.data.place.placeId}
                >
                  <div className="detail-place-review-header-more">전체보기</div>
                </Link>
              </div>
            </header>
            <body className="detail-place-review-body">
              {detailPlaceRivews?.data?.readReviewDTOList.slice(0, 2).map((review: RivewType) => (
                <Review key={review.review.reviewId} review={review} />
              ))}
            </body>
          </div>
        )}
        {detailPlace?.data.placeNoticeList.map((placeNotice: NoticeType) => (
          <PlaceNotice placeNotice={placeNotice} key={placeNotice.placeNoticeId}/>
        ))}
        <div className="detail-place-map">
          <header className="detail-place-map-header">지도</header>
          {detailPlace?.data.place.address ? <Map address={detailPlace.data.place.address} /> : null}
        </div>
      </div>
    </>
  );
}

export default DetailPlacePage;