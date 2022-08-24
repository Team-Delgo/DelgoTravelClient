import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AxiosResponse } from 'axios';
import { useDispatch } from 'react-redux';
import { useQuery } from 'react-query';
import Footer from '../../common/components/FooterNavigation';
import RecommendedPlace from './recommenedPlaces/RecommendedPlace';
import { tokenActions } from '../../redux/slice/tokenSlice';
import { tokenRefresh } from '../../common/api/login';
import { bookingGetDataByMain } from '../../common/api/booking';
import { getRecommendedPlace, getEditorNotePlacesAll } from '../../common/api/places';
import { useErrorHandlers } from '../../common/api/useErrorHandlers';
import { RootState } from '../../redux/store';
import './HomePage.scss';
import HomeReservation from './homeReservation/HomeReservation';
import Delgo from '../../icons/delgo.svg';
import Loading from '../../common/utils/Loading';

interface EditorPlaceType {
  mainUrl: string;
  placeId: number;
  thumbnailSubtitle: string;
  thumbnailTitle: string;
  thumbnailUrl: string;
}

interface RecommendedPlaceType {
  address: string;
  checkin: string;
  checkout: string;
  isBooking: number;
  lowestPrice: string;
  mainPhotoUrl: string;
  name: string;
  placeId: number;
  wishId: number;
}
const loadingScreenHeight = { height: window.innerHeight * 2 }

function HomePage() {
  const [page, setPage] = useState(0);
  const [dday, setDday] = useState('0');
  const dispatch = useDispatch();
  const accessToken = useSelector((state: RootState) => state.token.token);
  const userId = useSelector((state: RootState) => state.persist.user.user.id);
  const location: any = useLocation();
  const {homeScrollY} = useSelector((state: RootState) => state.persist.scroll);

  const preventGoBack = () => {
    window.history.pushState(null, '', null);
  };

  useEffect(() => {
    window.history.pushState(null, '', null);
    window.addEventListener('popstate', preventGoBack);
    return () => {
      window.removeEventListener('popstate', preventGoBack);
    };
  }, []);

  const { isLoading: getRecommendedPlacesIsLoading, data: recommendedPlaces } = useQuery(
    'getRecommendedPlaces',
    () => getRecommendedPlace(userId),
    {
      cacheTime: 1000 * 60 * 5,
      staleTime: 1000 * 60 * 3,
      refetchInterval: false,
      onError: (error: any) => {
        useErrorHandlers(dispatch, error);
      },
    },
  );

  const { isLoading: getBookingDataIsLoading, data: reservationPlaces } = useQuery(
    'bookingGetDataByMain',
    () => bookingGetDataByMain(accessToken, userId),
    {
      cacheTime: 1000 * 60 * 5,
      staleTime: 1000 * 60 * 3,
      refetchInterval: false,
      onError: (error: any) => {
        useErrorHandlers(dispatch, error);
      },
    },
  );

  const { isLoading: getEditorNotePlacesIsLoading, data: editorNotePlaces } = useQuery(
    'getEditorNotePlacesAll',
    () => getEditorNotePlacesAll(),
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
    if (location.state?.prevPath.includes('/detail-place')) {
      window.scrollTo(0, homeScrollY);
    } else {
      window.scrollTo(0, 0);
    }
  }, [getRecommendedPlacesIsLoading, getBookingDataIsLoading, getEditorNotePlacesIsLoading]);

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

  if (getRecommendedPlacesIsLoading) {
    return <div className="home-background" style={loadingScreenHeight}><Footer/></div>;
  }

  if (getBookingDataIsLoading) {
    return <div className="home-background" style={loadingScreenHeight}><Footer/></div>;
  }

  if (getEditorNotePlacesIsLoading) {
    return <div className="home-background" style={loadingScreenHeight}><Footer/></div>;
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
          {editorNotePlaces.data.map((place: EditorPlaceType) => (
            <Link
              className="editor-thumbnail"
              to={`/editor-note/${place.placeId}`}
              state={{ placeId: place.placeId }}
              key={place.placeId}
            >
              <img src={place.thumbnailUrl} alt="editor-thumnail-img" />
              <div className="editor-thumbnail-title">
                {place.thumbnailTitle}
              </div>
              <div className="editor-thumbnail-sub-title">
                {place.thumbnailSubtitle}
              </div>
            </Link>
          ))}
        </div>
        <header className="recommended-places-text">델고갈만한 숙소</header>
        {recommendedPlaces?.data.map((place: RecommendedPlaceType) => (
          <RecommendedPlace place={place} key={place.placeId} />
        ))}
      </div>
      <Footer />
    </>
  );
}

export default HomePage;
