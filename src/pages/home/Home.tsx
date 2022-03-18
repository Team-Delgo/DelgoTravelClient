import React,{useState} from 'react';
import { Link } from 'react-router-dom';
import ReservationInfo from './ReservationInfo';
import Footer from '../../common/layouts/Footer';
import './Home.scss';

function Home() {
  const editorPlaces = [
    {
      image: `${process.env.PUBLIC_URL}/assets/images/mainPlaceImage.png`,
      subtext: '바다가 보이는 여름숙소',
      name: '숙초 코코네집',
    },
  ];

  const redcommendedPlaces = [
    {
      image: `${process.env.PUBLIC_URL}/assets/images/recommendedPlaceImage.png`,
      name: '멍멍이네 하우스',
      location: '강원도 속초시 조앙동',
    },
    {
      image: `${process.env.PUBLIC_URL}/assets/images/recommendedPlaceImage.png`,
      name: '멍멍이네 하우스',
      location: '강원도 속초시 조앙동',
    },
    {
      image: `${process.env.PUBLIC_URL}/assets/images/recommendedPlaceImage.png`,
      name: '멍멍이네 하우스',
      location: '강원도 속초시 조앙동',
    },
  ];

  return (
    <>
      <div className="home-background">
        <ReservationInfo/> 
        <div className="main-header-text">Delgo!</div>
        {editorPlaces.map((place) => (
          <Link to="/editor-note/1">
            <div className="editor-thumbnail">
              <img src={place.image} alt="" />
              <div className="editor-thumbnail-subtext">{place.subtext}</div>
              <div className="editor-thumbnail-name">{place.name}</div>
            </div>
          </Link>
        ))}
        <div className="recommended-places-text">델고갈만한 숙소</div>
        {redcommendedPlaces.map((place) => (
          <div className="recommended-places">
            <img src={place.image} alt="" />
            <div className="recommended-places-name">{place.name}</div>
            <div className="recommended-places-location">{place.location}</div>
          </div>
        ))}
      </div>
      <Footer />
    </>
  );
}

export default Home;
