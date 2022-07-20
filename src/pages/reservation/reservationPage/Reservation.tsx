import React, { useEffect, useState } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { loadTossPayments } from '@tosspayments/payment-sdk';
import { reservationActions } from '../../../redux/slice/reservationSlice';
import { ReactComponent as Exit } from '../../../icons/exit.svg';
import RightArrow from '../../../icons/right-arrow.svg';
import './Reservation.scss';
import BottomButton from '../../../common/components/BottomButton';
import { TOSS } from '../../../constants/url.cosnt';

function Reservation() {
  const { user,room, place ,date} = useSelector((state: any) => state.persist.reservation);
  // const { date, dateString } = useSelector((state: any) => state.date);
  // const { currentPlace } = useSelector((state: any) => state.persist.currentPlace);
  // const { currentRoom } = useSelector((state: any) => state.persist.currentRoom);
  // const { user } = useSelector((state: any) => state.persist.user);
  const [reservationName,setReservationName] = useState("")
  const dispatch = useDispatch();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // const handleReservation = () => {
  //   dispatch(
  //     reservationActions.reservation({
  //       user: { id: user.id, nickname: user.nickname, email: user.email, phone: user.phone },
  //       place: {
  //         placeId: place.placeId,
  //         name: place.name,
  //         address: place.address,
  //       },
  //       room: {
  //         roomId: room.roomId,
  //         name: room.name,
  //         price: room.price,
  //         petNum:room.petNum,
  //         personNum:room.personNum
  //       },
  //       date: {
  //         date:date.date,
  //         dateString:date.dateString,
  //         checkIn:place.checkIn.substring(0, 5),
  //         checkOut:place.checkOut.substring(0, 5)
  //       },
  //     }),
  //   );
  // };


  const creditCardPayment = () => {
    dispatch(
      reservationActions.reservation({
        user: { id: user.id, nickname: reservationName, email: user.email, phone: user.phone },
        place: {
          placeId: place.placeId,
          name: place.name,
          address: place.address,
        },
        room: {
          roomId: room.roomId,
          name: room.name,
          price: room.price,
          petNum:room.petNum,
          personNum:room.personNum
        },
        date: {
          date:date.date,
          dateString:date.dateString,
          checkIn:date.checkIn.substring(0, 5),
          checkOut:date.checkOut.substring(0, 5)
        },
      }),
    );
    loadTossPayments(TOSS.CLIENT_KEY).then((tossPayments) => {
      tossPayments.requestPayment('카드', {
        amount: Number(room.price.slice(0, -1).replace(',', '')),
        orderId: 'AVw8mD2KHztN_646IGAZF',
        orderName: place.name + room.name,
        customerName: user.nickname,
        successUrl: `${process.env.REACT_APP_BASE_URL}/reservation-waiting/${place.placeId}/${room.roomId}/${date.date.start}/${date.date.end}`,
        failUrl: `${process.env.REACT_APP_BASE_URL}/reservation/${place.placeId}/${room.roomId}/${date.date.start}/${date.date.end}`,
      });
    });
  };

  // const BankTransfer = () => {
  //   loadTossPayments(TOSS.CLIENT_KEY).then((tossPayments) => {
  //     tossPayments.requestPayment('계좌이체', {
  //       amount: Number(currentRoom.price.slice(0, -1).replace(',', '')),
  //       orderId: 'AVw8mD2KHztN_646IGAZF',
  //       orderName: currentPlace.name + currentRoom.name,
  //       customerName: user.nickname,
  //       successUrl: `${process.env.REACT_APP_BASE_URL}/reservation-confirm/${currentPlace.placeId}/${currentRoom.roomId}/${date.date.start}/${date.date.end}`,
  //       failUrl: `${process.env.REACT_APP_BASE_URL}/reservation/${currentPlace.placeId}/${currentRoom.roomId}/${date.start}/${date.end}`,
  //     });
  //   });
  // };

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

  const handleReservationName = (e:any)=>{
    console.log(e.target.value)
    setReservationName(e.target.value)
  }

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
          </div>
          <p className="placeinfo-address">{place.address}</p>
          <p className="placeinfo-room">{place.name}</p>
        </div>
        <div className="checkin-checkout">
          <div className="checkin-checkout-date">
            <span className="check-title">체크인</span>
            <span className="check-date">
              {date.date.start.substring(2, 4)}.{date.date.start.substring(4, 6)}.{date.date.start.substring(6, 8)}{' '}
              {date.dateString.substring(5, 8)}
            </span>
            <span className="check-date">
              {date.checkIn}
            </span>
          </div>
          <div className="checkin-checkout-date">
            <span className="check-title">체크아웃</span>
            <span className="check-date">
              {date.date.end.substring(2, 4)}.{date.date.end.substring(4, 6)}.{date.date.end.substring(6, 8)}{' '}
              {date.dateString.substring(16, 19)}
            </span>
            <span className="check-date">
              {date.checkOut}
            </span>
          </div>
        </div>
        <h2 className="reservation-title first">예약자정보</h2>
        <div className="reservation-user-info">
          <div className="reservation-label">예약자 이름</div>
            <input className="reservation-user-info-name" type="text" onChange={handleReservationName} />
        </div>
        <div className="reservation-user-info">
          <div className="reservation-label">핸드폰 번호</div>
          <div className="reservation-user-info-phone">
          {user.phone}
          </div>
        </div>
        <div className="reservation-user-info">
          <div className="reservation-label">예약 인원 </div>
          <div className="reservation-user-info-phone">
            기준 {room.personNum}명 
          </div>
        </div>
        <div className="reservation-devide" />
        <h2 className="reservation-title second">할인정보</h2>
        <div className="original-price">
          <div className="reservation-label">상품가격</div>
          <div className="original-price-amount">{room.price}</div>
        </div>
        {/* <div className="point-sale">
          <div className="reservation-label">포인터 사용</div>
          <div className="point-sale-amount">-0P</div>
        </div> */}
        {/* <div className="available-point-sale">
          <div className="available-point-sale-label">전액 사용</div>
          <div/> 
          <div className="available-point-sale-amount">사용가능 : 3000P</div>
        </div> */}
        <div className="coupon-sale">
          <div className="reservation-label">쿠폰 사용</div>
          <div className="coupon-sale-amount">0원</div>
        </div>
        <div className="reservation-devide" />
        <div className="finalprice">
          <div className="reservation-label">결제 금액</div>
          <div className="finalprice-price">{room.price}</div>
        </div>
        {/* <div className="reservation-label">결제 수단</div> */}
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
