import React, { useState, useEffect } from 'react';
import { useSelector } from "react-redux";
import { Link, useNavigate } from 'react-router-dom';
import { AxiosResponse } from 'axios';
import { useDispatch } from 'react-redux';
import ReservationInfo from './reservationInfo/ReservationInfo';
import Footer from '../../common/components/Footer';
import RecommendedPlaces from './recommenedPlaces/RecommendedPlaces';
import { tokenActions } from '../../redux/reducers/tokenSlice';
import { tokenRefresh } from '../../common/api/login';
import { bookingGetDataByMain } from '../../common/api/booking';
import { getAllPlaces } from '../../common/api/getPlaces';
import Dog from '../../icons/dog.svg';
import Airplane from '../../icons/airplane.svg';
import Footprint from '../../icons/footprint.svg';
import Book from '../../icons/book.svg';
import Emergency from '../../icons/emergency.svg'
import './Home.scss';


interface EditorPlaceType {
  id: number
  image: string
  subtext: string
  name: string
}

interface RecommendedPlaceType {
  address: string
  lowestPrice: string
  mainPhotoUrl: string
  name: string
  placeId: number
  registDt: string
  wishId: number
}


function Home() {
  const [places, setPlaces] = useState<Array<RecommendedPlaceType>>([]);
  const [revervationPlaces, setRevervationPlaces] = useState<Array<any>>([]);

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
    }
  ]);
  const navigation = useNavigate();
  const dispatch = useDispatch();
  const refreshToken = localStorage.getItem('refreshToken') || '';
  const accessToken = useSelector((state: any) => state.token.token);
  const userId = useSelector((state: any) => state.persist.user.user.id)
  const { date, dateString } = useSelector((state: any) => state.date);
  const startDt = `${date.start.substring(0,4)}-${date.start.substring(4,6)}-${date.start.substring(6,10)}`
  const endDt = `${date.end.substring(0,4)}-${date.end.substring(4,6)}-${date.end.substring(6,10)}`

  useEffect(() => {
    getAllPlaces(userId,startDt,endDt, (response: AxiosResponse) => {
      setPlaces(response.data.data);
    }, dispatch);

    bookingGetDataByMain({accessToken, userId}, (response: AxiosResponse) => {
      setRevervationPlaces(response.data.data)
      console.log(response.data.data)
    }, dispatch);
  }, []);

  useEffect(() => {
    tokenRefresh({ refreshToken }, (response: AxiosResponse) => {
      const { code, codeMsg } = response.data;

      if (code === 200) {
        const accessToken = response.headers.authorization_access;
        const refreshToken = response.headers.authorization_refresh;

        dispatch(tokenActions.setToken(accessToken),);
        localStorage.setItem('refreshToken', refreshToken);
      }
      else {
        navigation('/user/signin');
      }
    }, dispatch);
  }, [accessToken]);

  return (
    <>
      <div className="home-background">
      <div className="reservation-places">
        {
          revervationPlaces.map((a) => (
            <ReservationInfo key={a.bookingId}/>
          ))
        }
        </div>
        {
          revervationPlaces.length > 0 ?
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
            </div> : null
        }
        <div className="main-header-text">Delgo!</div>
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
        {places?.map((place) => (
          <RecommendedPlaces places={places} setPlaces={setPlaces} place={place} key={place.placeId} />
        ))}
      </div>
      <Footer />
    </>
  );
}

export default Home;
