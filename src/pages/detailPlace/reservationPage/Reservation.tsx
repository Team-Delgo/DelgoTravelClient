import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { loadTossPayments } from '@tosspayments/payment-sdk';
import { ReactComponent as Exit } from '../../../icons/exit.svg';
import RightArrow from '../../../icons/right-arrow.svg';
import './Reservation.scss';
import BottomButton from '../../../common/components/BottomButton';
import { TOSS } from '../../../constants/url.cosnt';

function Reservation() {
  const { user,room, place,date } = useSelector((state: any) => state.persist.reservation);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const creditCardPayment = () => {
    loadTossPayments(TOSS.CLIENT_KEY).then((tossPayments) => {
      tossPayments.requestPayment('카드', {
        amount: Number(room.price.slice(0, -1).replace(',', '')),
        orderId: 'AVw8mD2KHztN_646IGAZF',
        orderName: place.name + room.name,
        customerName: user.nickname,
        successUrl: `${process.env.REACT_APP_BASE_URL}/reservation-confirm/${place.placeId}/${room.roomId}/${date.date.start}/${date.date.end}`,
        failUrl: `${process.env.REACT_APP_BASE_URL}/reservation/${place.placeId}/${room.roomId}/${date.date.start}/${date.date.end}`,
      });
    });
  };

  const BankTransfer = () => {
    loadTossPayments(TOSS.CLIENT_KEY).then((tossPayments) => {
      tossPayments.requestPayment('계좌이체', {
        amount: Number(room.price.slice(0, -1).replace(',', '')),
        orderId: 'AVw8mD2KHztN_646IGAZF',
        orderName: place.name + room.name,
        customerName: user.nickname,
        successUrl: `${process.env.REACT_APP_BASE_URL}/reservation-confirm/${place.placeId}/${room.roomId}/${date.start}/${date.end}`,
        failUrl: `${process.env.REACT_APP_BASE_URL}/reservation/${place.placeId}/${room.roomId}/${date.start}/${date.end}`,
      });
    });
  };

  const config = {
    next_redirect_pc_url: '',
    tid: '',
    params: {
      cid: 'TC0ONETIME',
      partner_order_id: 'partner_order_id',
      partner_user_id: 'partner_user_id',
      item_name: '동대문엽기떡볶이',
      quantity: 1,
      total_amount: 22000,
      vat_amount: 0,
      tax_free_amount: 0,
      approval_url: 'http://localhost:3000',
      fail_url: 'http://localhost:3000',
      cancel_url: 'http://localhost:3000',
    },
  };

  const APP_ADMIN_KEY = '280b4b1856b2e89cb30fa6706dd06751';

  const postKakaopay = async () => {
    const data = await axios.post('/api/v1/payment/ready', config, {
      headers: {
        Authorization: `KakaoAK ${APP_ADMIN_KEY}`,
        'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
      },
    });
  };

  return (
    <>
      <div className="reservationPage">
        <div className="header">
          <Link to={`/detail-place/${place.placeId}/${room.roomId}`} key={place.placeId} state={{ room, place }}>
            <Exit className="exit-button" />
          </Link>
          <h1 className="header-title">예약</h1>
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
              {date.date.start.substring(2, 4)}.{date.date.start.substring(4, 6)}.{date.date.start.substring(6, 8)}{' '}
              {date.dateString.substring(5, 8)}
            </span>
          </div>
          <div className="checkin-checkout-date">
            <span className="check-title">체크아웃</span>
            <span className="check-date">
              {date.date.end.substring(2, 4)}.{date.date.end.substring(4, 6)}.{date.date.end.substring(6, 8)}{' '}
              {date.dateString.substring(16, 19)}
            </span>
          </div>
        </div>
        <h2 className="reservation-title first">예약자정보</h2>
        <div className="reservation-user-info">
          <div className="reservation-label">예약자 이름</div>
          <div className="reservation-user-info-phone">
            {user.nickname} / {user.phone}
          </div>
          <div aria-hidden="true" className="reservation-user-info-change">
            변경
          </div>
        </div>
        <div className="reservation-devide" />
        <h2 className="reservation-title second">할인정보</h2>
        <div className="original-price">
          <div className="reservation-label">상품가격(1박)</div>
          <div className="original-price-amount">{room.price}</div>
        </div>
        <div className="point-sale">
          <div className="reservation-label">포인터 사용</div>
          <div className="point-sale-amount">-0p</div>
        </div>
        <div className="coupon-sale">
          <div className="reservation-label">쿠폰 사용</div>
          <div className="coupon-sale-amount">0원</div>
        </div>
        <div className="reservation-devide" />
        <div className="finalprice">
          <div className="reservation-label">결제 금액</div>
          <div className="finalprice-price">{room.price}</div>
        </div>
        <div className="reservation-label">결제 수단</div>
        {/* <div className="payment-method">
          <div className="payment-method-item" aria-hidden="true" onClick={creditCardPayment}>
            신용카드
          </div>
          <div className="payment-method-item">카카오페이</div>
          <div className="payment-method-item" aria-hidden="true" onClick={BankTransfer}>
            토스
          </div>
        </div> */}
      </div>
      <div aria-hidden="true" onClick={creditCardPayment}>
      <BottomButton text={`${room.price} 결제하기`}/>
      </div>
    </>
  );
}

export default Reservation;
