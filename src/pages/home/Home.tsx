import React from 'react';
import Footer from '../../common/Footer';
import './Home.scss';

function Home() {
  return (
    <div className="mainBackground">
      <div className="mainHeaderText">Delgo!</div>
      <div className="mainPlaceImage">
        <img src={`${process.env.PUBLIC_URL}/assets/images/mainPlaceImage.png`} alt="" />
        <div className="mainPlaceImageSubText">바다가 보이는 여름숙소</div>
        <div className="mainPlaceImageName">숙초 코코네집</div>
      </div>
      <div className="recommendedPlaceText">델고갈만한 숙소</div>
      <div className="recommendedPlaceImage">
        <img src={`${process.env.PUBLIC_URL}/assets/images/recommendedPlaceImage.png`} alt="" />
        <div className="recommendedPlaceName">멍멍이네 하우스</div>
        <div className="recommendedPlaceLocation">강원도 속초시 조앙동</div>
      </div>
      <Footer />
    </div>
  );
}

export default Home;
