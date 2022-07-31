import React, { useState, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams, useNavigate,useLocation } from 'react-router-dom';
import classNames from 'classnames';
import { AxiosResponse } from 'axios';
import { Transition  } from 'react-transition-group';
import { useQuery } from 'react-query'
import RoomType from './roomType/RoomType';
import Review from './review/Review';
import ImageSlider from '../../common/utils/ImageSlider';
import Map from '../../common/utils/Map';
import AlertConfirm from '../../common/dialog/AlertConfirm';
import {
  SIGN_IN_PATH,
} from '../../constants/path.const';
import {RootState} from '../../redux/store'
import { ReactComponent as ActiveHeart } from '../../icons/heart-active.svg';
import { ReactComponent as Heart } from '../../icons/heart.svg';
import { getDetailPlace} from '../../common/api/places';
import { getDetailPlaceRivews} from '../../common/api/reivew';
import { wishInsert, wishDelete } from '../../common/api/wish';
import { ReactComponent as LeftArrow } from '../../icons/left-arrow2.svg';
import { currentPlaceActions } from '../../redux/slice/placeSlice';
import { scrollActions } from '../../redux/slice/scrollSlice';
import './DetailPlacePage.scss';
import Calender from '../../common/utils/Calender';
import { useErrorHandlers } from '../../common/api/useErrorHandlers';
import Notice from './notice/Notice'


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

function DetailPlacePage() {
  const [isCalenderOpen, setIsCalenderOpen] = useState(false);
  const [logInModalOpen, setLogInModalOpen] = useState(false);
  const { date, dateString } = useSelector((state: RootState) => state.date);
  const userId = useSelector((state: RootState) => state.persist.user.user.id);
  const accessToken = useSelector((state: RootState) => state.token.token);
  const isSignIn = useSelector((state: RootState) => state.persist.user.isSignIn);
  const { placeId } = useParams();
  const location: any = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { whereToGoScrollY,detailPlaceScrollY,myStorageY } = useSelector((state: RootState) => state.persist.scroll);
  const detailPlacePrevPath = useSelector((state: RootState) => state.persist.prevPath.detailPlace);
  const startDt =`${date.start.substring(0,4)}-${date.start.substring(4,6)}-${date.start.substring(6,10)}`
  const endDt = `${date.end.substring(0,4)}-${date.end.substring(4,6)}-${date.end.substring(6,10)}`
  

  const { 
    isLoading: getDetailPlaceIsLoading,
    data: detailPlace,
    refetch,
  } = useQuery('getDetailPlace', () => getDetailPlace(userId, placeId as string, startDt, endDt), {
    cacheTime: 1000 * 60 * 5,
    staleTime: 1000 * 60 * 3,
    refetchInterval: false,
    onError: (error: any) => {
      useErrorHandlers(dispatch, error);
    },
  });

  const { isLoading: getDetailPlaceIsLoading2, data: detailPlaceRivews } = useQuery(
    'getDetailPlaceRivews',
    () => getDetailPlaceRivews(placeId as string),
    {
      cacheTime: 1000 * 60 * 5,
      staleTime: 1000 * 60 * 3,
      refetchInterval: false,
      onError: (error: any) => {
        useErrorHandlers(dispatch, error);
      },
    },
  );

  useEffect(() => {
    console.log(detailPlacePrevPath)
    refetch()
  }, [date]); 


  useEffect(() => {
    console.log(detailPlaceScrollY)
    if (location.state?.prevPath.includes('/detail-place')) {
      window.scroll(0, Number(detailPlaceScrollY));
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

  const wishListInsert = useCallback(() => {
    if(isSignIn){
    wishInsert(
      { userId, placeId: Number(detailPlace?.data.place.placeId), accessToken },
      (response: AxiosResponse) => {
        if (response.data.code === 200) {
          refetch()
        }
      },
      dispatch,
    )}
    else{
      setLogInModalOpen(true);
    }
  }, [detailPlace,isSignIn]);

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
    if (detailPlacePrevPath.toString() === '/my-storage')
      navigate('/my-storage', {
        state: {
          prevPath: location.pathname,
        },
      });
    else if (detailPlacePrevPath.toString() === '/where-to-go')
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

  if (getDetailPlaceIsLoading){
    return <div className='detail-place'>&nbsp;</div>;
  }

  if (getDetailPlaceIsLoading2){
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
                  state={{ reviews: detailPlaceRivews.data.readReviewDTOList }}
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
        {detailPlace?.data.placeNoticeList.map((notice: NoticeType) => (
          <Notice notice={notice} key={notice.placeNoticeId}/>
        ))}
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

export default DetailPlacePage;