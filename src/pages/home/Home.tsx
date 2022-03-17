import React from 'react';
import Footer from '../../common/layouts/Footer';
import './Home.scss';

function Home() {
  return (
    <>
      <div className="home-background">
        <div className="main-headertext">Delgo!</div>
        <div className="main-place">
          <img src={`${process.env.PUBLIC_URL}/assets/images/mainPlaceImage.png`} alt="" />
          <div className="main-place-subtext">바다가 보이는 여름숙소</div>
          <div className="main-place-name">숙초 코코네집</div>
        </div>
        <div className="recommended-placetext">델고갈만한 숙소</div>
        <div className="recommended-place">
          <img src={`${process.env.PUBLIC_URL}/assets/images/recommendedPlaceImage.png`} alt="" />
          <div className="recommended-place-name">멍멍이네 하우스</div>
          <div className="recommended-place-location">강원도 속초시 조앙동</div>
        </div>
        <div className="recommended-place">
          <img src={`${process.env.PUBLIC_URL}/assets/images/recommendedPlaceImage.png`} alt="" />
          <div className="recommended-place-name">멍멍이네 하우스</div>
          <div className="recommended-place-location">강원도 속초시 조앙동</div>
        </div>
        <div className="recommended-place">
          <img src={`${process.env.PUBLIC_URL}/assets/images/recommendedPlaceImage.png`} alt="" />
          <div className="recommended-place-name">멍멍이네 하우스</div>
          <div className="recommended-place-location">강원도 속초시 조앙동</div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Home;
