import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useQuery } from 'react-query';
import Footer from '../../common/components/FooterNavigation';
import RecommendedPlace from './recommenedPlaces/RecommendedPlace';
import { bookingGetDataByMain } from '../../common/api/booking';
import { getRecommendedPlace, getEditorNotePlacesAll } from '../../common/api/places';
import { useErrorHandlers } from '../../common/api/useErrorHandlers';
import {
  GET_EDITOR_NOTE_PLACES_ALL,
  GET_RECOMMENED_PLACES,
  GET_BOOKING_DATA_BY_MAIN,
  CACHE_TIME,
  STALE_TIME,
} from '../../common/constants/queryKey.const';
import { RootState } from '../../redux/store';
import HomeReservation from './homeReservation/HomeReservation';
import Delgo from '../../common/icons/delgo.svg';
import { EditorPlaceType } from '../../common/types/editor';
import { PlaceType } from '../../common/types/place';
import './HomePage.scss';

const loadingScreenHeight = { height: window.innerHeight * 10 }

const infoContent = `주소 : 서울특별시 광진구 광나루로 19길 23 가온나리1 202호
대표 : 이창민 | 사업자등록번호 : 345-49-00732
전자우편주소 : help@zollezolle.me
통신판매번호 : 2022-서울광진-1816
호스팅서비스게종자의 상호 표시 : Delgo
  `

function HomePage() {
  const [page, setPage] = useState(0);
  const [dday, setDday] = useState('0');
  const homeScrollY = useSelector((state: RootState) => state.persist.scroll.homeScrollY);
  const userId = useSelector((state: RootState) => state.persist.user.user.id);
  const dispatch = useDispatch();
  const location: any = useLocation();

  const { isLoading: getBookingDataIsLoading, data: reservationPlaces } = useQuery(
    GET_BOOKING_DATA_BY_MAIN,
    () => bookingGetDataByMain(userId),
    {
      cacheTime: CACHE_TIME,
      staleTime: STALE_TIME,
      onError: (error: any) => {
        useErrorHandlers(dispatch, error);
      },
    },
  );


  const { isLoading: getEditorNotePlacesIsLoading, data: editorNotePlaces } = useQuery(
    GET_EDITOR_NOTE_PLACES_ALL,
    () => getEditorNotePlacesAll(),
    {
      cacheTime: CACHE_TIME,
      staleTime: STALE_TIME,
      refetchInterval: false,
      onError: (error: any) => {
        console.log(error)
        useErrorHandlers(dispatch, error);
      },
    },
  );

  const {
    isLoading: getRecommendedPlacesIsLoading,
    data: recommendedPlaces,
  } = useQuery(GET_RECOMMENED_PLACES, () => getRecommendedPlace(userId), {
    cacheTime: CACHE_TIME,
    staleTime: STALE_TIME,
    onError: (error: any) => {
      useErrorHandlers(dispatch, error);
    },
  });

  useEffect(() => {
    console.log(reservationPlaces)
    // window.history.pushState(null, '', location.href);
    // window.addEventListener('popstate', preventGoBack);
    // return () => {
      // window.removeEventListener('popstate', preventGoBack);
    // };
  }, [getBookingDataIsLoading]);

  useEffect(() => {
    if (location.state?.prevPath.includes('/detail-place')) {
      window.scrollTo(0, homeScrollY);
    } else {
      window.scrollTo(0, 0);
    }
  }, [getRecommendedPlacesIsLoading, getBookingDataIsLoading, getEditorNotePlacesIsLoading]);

  const preventGoBack = () => {
    // window.history.pushState(null, '', location.href);
  };

  const getDday = () => {
    const startDate = new Date(reservationPlaces?.data[page].startDt);
    const currentDate = new Date();
    const dateDif = startDate.getTime() - currentDate.getTime();
    const dDay = dateDif / (1000 * 60 * 60 * 24);
    let dDayString;
    if (dDay < 1) {
      dDayString = 'DAY';
    } else {
      dDayString = Math.ceil(dDay).toString();
    }
    setDday(dDayString);
  };

  useEffect(() => {
    if (reservationPlaces?.data?.length) getDday();
  }, [page, reservationPlaces]);

  if (getRecommendedPlacesIsLoading || getBookingDataIsLoading || getEditorNotePlacesIsLoading) {
    return (
      <div className="home-background" style={loadingScreenHeight}>
        <Footer />
      </div>
    );
  }

  return (
    <>
      <div className="home-background">
        <img src={Delgo} alt="delgo" className="delgo" />
        {reservationPlaces?.data?.length > 0 && (
          <>
            <div className="home-reservation-info">
              {reservationPlaces?.data[page]?.place.address.slice(0, 2)} 여행까지 D-{dday}✈️
            </div>
            <HomeReservation
              lists={reservationPlaces?.data}
              pageChange={(number) => {
                let temp = number;
                if (temp + 1 > reservationPlaces?.data.length) temp = reservationPlaces.data.length - 1;
                setPage(temp);
              }}
            />
          </>
        )}
        <header className="editor-header-text">델고 에디터노트</header>
        <div className="editor-container">
          {editorNotePlaces.data?.map((place: EditorPlaceType) => (
            <Link
              className="editor-thumbnail"
              to={`/editor-note/${place.placeId}`}
              state={{ placeId: place.placeId }}
              key={place.placeId}
            >
              <img src={place.thumbnailUrl} alt="editor-thumnail-img" />
              <div className="editor-thumbnail-title">{place.thumbnailTitle}</div>
              <div className="editor-thumbnail-sub-title">{place.thumbnailSubtitle}</div>
            </Link>
          ))}
        </div>
        <header className="recommended-places-text">델고갈만한 숙소</header>
        {recommendedPlaces?.data.map((place: PlaceType) => (
          <RecommendedPlace place={place} key={place.placeId} />
        ))}
        {/* <div className='home-buisness-information'>
          <div className='home-buisness-information-title'>이제 우리 강아지도 Delgo 가요!</div>
          <div className='home-buisness-information-des'>
            {infoContent}
          </div>
        </div> */}
      </div>
      <Footer />
    </>
  );
}

export default HomePage;
