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
import { getAllPlaces } from '../../common/api/getPlaces';
import './Home.scss';


interface EditorPlaceType {
  id: number
  image: string
  subtext: string
  name: string
}

interface RecommendedPlaceType  {
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

  useEffect(() => {
    getAllPlaces(userId, (response: AxiosResponse) => {
      setPlaces(response.data.data);
    });
    console.log(process.env.REACT_APP_BASE_URL)
  }, []);

  useEffect(() => {
    tokenRefresh({ refreshToken }, (response: AxiosResponse) => {
      const { code, codeMsg } = response.data;
      console.log(codeMsg);

      if (code === 200) {
        const accessToken = response.headers.authorization_access;
        const refreshToken = response.headers.authorization_refresh;

        dispatch(tokenActions.setToken(accessToken),);
        localStorage.setItem('refreshToken', refreshToken);
      }
      else {
        navigation('/user/signin');
      }
    });
  }, [accessToken]);

  return (
    <>
      <div className="home-background">
        <ReservationInfo />
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
        {places.map((place) => (
          <RecommendedPlaces places={places} setPlaces={setPlaces} place={place} key={place.placeId} />
        ))}
      </div>
      <Footer />
    </>
  );
}

export default Home;
