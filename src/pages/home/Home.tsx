import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AxiosResponse } from 'axios';
import { useDispatch } from 'react-redux';
import { useQuery } from 'react-query'
import Footer from '../../common/components/Footer';
import RecommendedPlaces from './recommenedPlaces/RecommendedPlaces';
import { tokenActions } from '../../redux/slice/tokenSlice';
import { tokenRefresh } from '../../common/api/login';
import { bookingGetDataByMain } from '../../common/api/booking';
import { getAllPlaces } from '../../common/api/getPlaces';
import { useErrorHandlers } from '../../common/api/useErrorHandlers';
import Dog from '../../icons/dog.svg';
import Airplane from '../../icons/airplane.svg';
import Footprint from '../../icons/footprint.svg';
import Book from '../../icons/book.svg';
import Emergency from '../../icons/emergency.svg';
import './Home.scss';
import HomeReservation from './HomeReservation';
import Delgo from '../../icons/delgo.svg';

interface EditorPlaceType {
  id: number;
  image: string;
  subtext: string;
  name: string;
}

interface RecommendedPlaceType {
  address: string;
  lowestPrice: string;
  mainPhotoUrl: string;
  name: string;
  placeId: number;
  registDt: string;
  wishId: number;
}

interface PlaceType {
  address: string
  checkin: string
  checkout: string
  isBooking: number
  lowestPrice: string
  mainPhotoUrl: string
  name: string
  placeId: number
  wishId: number
}

function Home() {
  const [page, setPage] = useState(0);
  const [dday, setDday] = useState(0);
  const [reservationPlaces, setReservationPlaces] = useState<Array<any>>([]);
  const [editorPlaces, setEditorPlaces] = useState<Array<EditorPlaceType>>([
    {
      id: 1,
      image: `${process.env.PUBLIC_URL}/assets/images/editorThumnail.png`,
      subtext: '바다가 보이는 여름숙소',
      name: '숙초 코코네집',
    },
    {
      id: 2,
      image: `${process.env.PUBLIC_URL}/assets/images/editorThumnail.png`,
      subtext: '바다가 보이는 여름숙소',
      name: '숙초 코코네집',
    },
  ]);
  const navigation = useNavigate();
  const dispatch = useDispatch();
  const refreshToken = localStorage.getItem('refreshToken') || '';
  const accessToken = useSelector((state: any) => state.token.token);
  const userId = useSelector((state: any) => state.persist.user.user.id);
  const { date } = useSelector((state: any) => state.date);
  const startDt = `${date.start.substring(0, 4)}-${date.start.substring(4, 6)}-${date.start.substring(6, 10)}`;
  const endDt = `${date.end.substring(0, 4)}-${date.end.substring(4, 6)}-${date.end.substring(6, 10)}`;
  const location: any = useLocation();
  const { homeY } = useSelector((state: any) => state.persist.scroll);


  const { isLoading, data: recommendedPlaces } = useQuery('getAllPlaces', () => getAllPlaces(userId, startDt, endDt), {
    cacheTime: 1000 * 60 * 5,
    staleTime: 1000 * 60 * 3,
    refetchInterval: false,
    onError: (error: any) => {
      useErrorHandlers(dispatch, error);
    },
  });


  useEffect(() => {
    bookingGetDataByMain(
      { accessToken, userId },
      (response: AxiosResponse) => {
        setReservationPlaces(response.data.data);
      },
      dispatch,
    );
  }, []);

  useEffect(() => {
    if (location.state?.prevPath.includes('/detail-place')) {
      window.scrollTo(0, homeY);
    } else {
      window.scrollTo(0, 0);
    }
  }, [reservationPlaces, recommendedPlaces]);

  const getDday = () => {
    const startDate = new Date(reservationPlaces[page].startDt);
    const currentDate = new Date();
    const dateDif = startDate.getTime() - currentDate.getTime();
    const dDay = dateDif / (1000 * 60 * 60 * 24);

    setDday(Math.ceil(dDay))
  };

  useEffect(() => {
    if (reservationPlaces.length)
      getDday();
  }, [page, reservationPlaces]);


  useEffect(() => {
    tokenRefresh(
      { refreshToken },
      (response: AxiosResponse) => {
        const { code } = response.data;

        if (code === 200) {
          const accessToken = response.headers.authorization_access;
          const refreshToken = response.headers.authorization_refresh;

          dispatch(tokenActions.setToken(accessToken));
          localStorage.setItem('refreshToken', refreshToken);
        } else {
          navigation('/user/signin');
        }
      },
      dispatch,
    );
  }, [accessToken]);

  return (
    <>
      <div className="home-background">
        <img src={Delgo} alt="delgo" className="delgo" />
        {reservationPlaces?.length && (
          <>
            <div className='home-reservation-info'>{reservationPlaces[page]?.place.address.slice(0, 2)} 여행까지 D-{dday}</div>
            <HomeReservation
              lists={reservationPlaces}
              pageChange={(number) => {
                setPage(number);
              }}
            />
          </>
        )}
        {reservationPlaces?.length ? (
          <div className="travel-preparation">
            <div className="travel-preparation-text">여행준비 되셨나요?</div>
            <div className="travel-preparation-list">
              <div>
                <img src={Emergency} alt="emergency" />
                &nbsp;응급상황
              </div>
              <div>
                <img src={Dog} alt="dog" />
                &nbsp;여행펫티켓
              </div>
              <div>
                <img src={Airplane} alt="airplane" />
                &nbsp;비행기탑승
              </div>
              <div>
                <img src={Footprint} alt="footprint" />
                &nbsp;필수준비물
              </div>
              <div>
                <img src={Book} alt="book" />
                &nbsp;기초상식
              </div>
            </div>
          </div>
        ) : (
          <div />
        )}
        <div className="main-header-text">델고 에디터노트</div>
        <div className="editor-container">
          {editorPlaces.map((place) => (
            <Link to={`/editor-note/${place.id}`} key={place.id}>
              <div className="editor-thumbnail" key={place.id}>
                <img src={place.image} alt="editor-thumnail-img" />
                <div className="editor-thumbnail-subtext">{place.subtext}</div>
                <div className="editor-thumbnail-name">{place.name}</div>
              </div>
            </Link>
          ))}
        </div>
        <div className="recommended-places-text">델고갈만한 숙소</div>
        {recommendedPlaces?.data.map((place: PlaceType) => (
          <RecommendedPlaces place={place} key={place.placeId} />
        ))}
      </div>
      <Footer />
    </>
  );
}

export default Home;