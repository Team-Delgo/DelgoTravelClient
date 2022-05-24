import React,{useCallback,useEffect} from "react";
import { useSelector } from "react-redux";
import { useNavigate, useLocation,Link } from 'react-router-dom';
import { ReactComponent as Exit } from '../../../icons/exit.svg';
import RightArrow from "../../../icons/right-arrow.svg";
import RightArrowBlack from "../../../icons/right-arrow-black.svg";
import BottomButton from "../../../common/components/BottomButton";
import './ReservationConfirmPage.scss';

function ReservationConfirmPage() {
  const navigate = useNavigate();
  const { nickname, phone } = useSelector((state: any) => state.persist.user.user);
  const { date, dateString } = useSelector((state: any) => state.date);
  const { room, place } = useSelector((state: any) => state.persist.reservation);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const moveToMainPage = useCallback(() => {
    navigate('/');
  }, []);

  return (
    <>
      <div className="reservationPage">
        <div className="header">
          <Exit className="exit-button" onClick={moveToMainPage} />
          <h1 className="header-title">예약확정</h1>
        </div>
        <div className="placeinfo">
          <div className="placeinfo-wrapper">
            <div className="placeinfo-name">{place.name}</div>
            <img src={RightArrow} alt="detail" />
          </div>
          <p className="placeinfo-address">{place.address}</p>
          <p className="placeinfo-room">502호 [온수풀, 더블베드타입]</p>
        </div>
        <div className="checkin-checkout">
          <div className="checkin-checkout-date">
            <span className="check-title">체크인</span>
            <span className="check-date">
              {date.start.substring(2, 4)}.{date.start.substring(4, 6)}.{date.start.substring(6, 8)}{' '}
              {dateString.substring(5, 8)}
            </span>
            <span className="check-date">{room.checkin.substring(0, 5)}</span>
          </div>
          <div className="checkin-checkout-date">
            <span className="check-title">체크아웃</span>
            <span className="check-date">
              {date.end.substring(2, 4)}.{date.end.substring(4, 6)}.{date.end.substring(6, 8)}{' '}
              {dateString.substring(16, 19)}
            </span>
            <span className="check-date">{room.checkout.substring(0, 5)}</span>
          </div>
        </div>
        <h2 className="reservation-title first">예약정보</h2>
        <div className="reservation-info">
          <div className="reservation-info-first-line">
            <div className="reservation-info-first-line-number-label">예약번호</div>
            <div className="reservation-info-first-line-number">123213131</div>
          </div>
          <div className="reservation-info-second-line">
            <div className="reservation-info-second-line-name-label">예약자 이름</div>
            <div className="reservation-info-second-line-name">
              {nickname} / {phone}
            </div>
          </div>
        </div>
        <div className="reservation-devide" />
        <h2 className="reservation-title second">결제 정보</h2>
        <div className="original-price">
          <div className="reservation-label">상품가격(1박)</div>
          <div className="original-price-amount">100,000원</div>
        </div>
        <div className="couponsale">
          <div className="reservation-label">결제 시 포인터 사용</div>
          <div className="couponsale-amount">-0P</div>
        </div>
        <div className="couponsale">
          <div className="reservation-label">결제 시 쿠폰 사용</div>
          <div className="couponsale-amount">0원</div>
        </div>
        <div className="reservation-devide" />
        <div className="finalprice">
          <div className="reservation-label">결제 금액</div>
          <div className="finalprice-price">99,000원</div>
        </div>
        <div className="payment-method">
          <div className="payment-method-label">결제 수단</div>
          <div className="payment-method-price">신용카드</div>
        </div>
        <div className="view-policy">
          {place.name} 정책보기
          <img src={RightArrowBlack} alt="detail" />
        </div>
        <div className="cancel-reservation">
          <div className="cancel-reservation-label">2022년 05월 23일 18:00까지 무료 취소 가능합니다.</div>
          <button className="cancel-reservation-button" type="button">예약취소</button>
        </div>
      </div>
      <BottomButton text="예약내역 공유하기" />
    </>
  );
}

export default ReservationConfirmPage;