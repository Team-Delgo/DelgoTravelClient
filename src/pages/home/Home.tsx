import React,{useState} from 'react';
import { Link } from 'react-router-dom';
import ReservationInfo from './reservationInfo/ReservationInfo';
import Footer from '../../common/layouts/Footer';
import RecommendedPlaces from './recommendedPlaces/RecommendedPlaces';
import './Home.scss';

type EditorPlaceType = {
  id: number
  image:string
  subtext: string
  name: string
}

type RecommendedPlaceType = {
  id: number
  image:string
  name: string
  location: string
}

function Home() {

  const [editorPlaces, setEditorPlaces] = useState<Array<EditorPlaceType>>([
    {
      id:1,
      image: `${process.env.PUBLIC_URL}/assets/images/editorThumnail.png`,
      subtext: '바다가 보이는 여름숙소',
      name: '숙초 코코네집',
    },
    {
      id:2,
      image: `${process.env.PUBLIC_URL}/assets/images/editorThumnail.png`,
      subtext: '바다가 보이는 여름숙소',
      name: '숙초 코코네집',
    }
  ]);

  const [redcommendedPlaces, setRedcommendedPlaces] = useState<Array<RecommendedPlaceType>>([
    {
      id: 1,
      image: `${process.env.PUBLIC_URL}/assets/images/recommendedPlaceImage.png`,
      name: '멍멍이네 하우스',
      location: '강원도 속초시 조앙동',
    },
    {
      id: 2,
      image: `${process.env.PUBLIC_URL}/assets/images/recommendedPlaceImage.png`,
      name: '멍멍이네 하우스',
      location: '강원도 속초시 조앙동',
    },
    {
      id: 3,
      image: `${process.env.PUBLIC_URL}/assets/images/recommendedPlaceImage.png`,
      name: '멍멍이네 하우스',
      location: '강원도 속초시 조앙동',
    },
  ]);

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
        {redcommendedPlaces.map((place) => (
          <RecommendedPlaces place={place} key={place.id} />
        ))}
      </div>
      <Footer />
    </>
  );
}

export default Home;
