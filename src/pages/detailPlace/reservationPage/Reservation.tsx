import React from "react";
import { ReactComponent as Exit } from '../../../icons/exit.svg';
import RightArrow from "../../icons/right-arrow.svg";

function Reservation() {
  return <div>
    <div className="header">
      <Exit />
      <h1 className="header-title">예약</h1>
    </div>
    <div className="placeinfo">
      <div className="placeinfo-wrapper">
        <div className="placeinfo-name">밸런스독</div>
        <img src={RightArrow} alt="detail" />
      </div>
      <p className="placeinfo-address">경기도 양평군 지평면 바깥섬부리 1길 3-29</p>
      <p className="placeinfo-room">502호 [온수풀, 더블베드타입]</p>
    </div>
    <div className="checkin-checkout">
      <div className="checkin">
        <span className="check-title">체크인</span>
        <span className="check-date">22.5.26(목)</span>
        <span className="check-time">14:00</span>
      </div>
      <div className="checkout">
        <span className="check-title">체크아웃</span>
        <span className="check-date">22.5.27(금)</span>
        <span className="check-time">11:00</span>
      </div>
    </div>
    <h2 className="reservation-user-title">예약자정보</h2>
    <div className="reservation-user-info">
      <div className="reservation-user-info-name">예약자 이름</div>
      <div className="reservation-user-info-phone">이창민/01000000000</div>
      <div aria-hidden="true" className="reservation-user-info-change">변경</div>
    </div>
    <div className="reservation-devide" />
    <h2 className="reservation-sale-title">할인정보</h2>
    <div className="original-price">
      <div className="original-price-label">상품가격(1박)</div>
      <div className="original-price-amount">100,000원</div>
    </div>
    <div className="couponsale">
      <div className="couponsale-label">쿠폰 사용</div>
      <div className="couponsale-amount">0원</div>
    </div>
    <div className="reservation-devide" />
    <div className="finalprice">
      <div className="finalprice-label">결제 금액</div>
      <div className="finalprice-amount">99,000원</div>
    </div>

  </div>
};

export default Reservation;