import React from "react";
import "./MyAccount.scss";

function MyAccount() {
  return <div className="account">
    <div className="account-profile">
      <img className="account-profile-image" src={`${process.env.PUBLIC_URL}/assets/images/dummyDog.jpg`} alt="dog" />
      <div className="account-profile-name">몽자</div>
      <div className="account-profile-info">
        <div className="account-proifle-info-coupon">
          <p className="account-profile-info-column">쿠폰</p>
          <p className="account-profile-info-value">3장</p>
        </div>
        <div className="account-proifle-info-point">
          <p className="account-profile-info-column">포인트</p>
          <p className="account-profile-info-value">15896</p>
        </div>
        <div className="account-proifle-info-review">
          <p className="account-profile-info-column">리뷰</p>
          <p className="account-profile-info-value">2건</p>
        </div>
      </div>
    </div>
    <div className="account-purchase">
      <div className="account-purchase-reservation">
        <h1 className="account-purchase-reservation-title">예약내역</h1>
        <div className="account-purchase-reservation-box">
          <div className="account-purchase-reservation-box-wrapper">
            <title>밸런스독</title>
            <p className="room">프리미엄 한옥빌라[102동 온수...</p>
            <p className="date">05.06~05.07 1박</p>
          </div>
          <button type="button" className="account-purchase-reservation-box-state">취소완료</button>
        </div>
      </div>
    </div>
  </div>;
};

export default MyAccount;