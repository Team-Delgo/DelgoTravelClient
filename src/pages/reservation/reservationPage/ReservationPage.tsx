import React, { useCallback, useEffect, useState ,useRef} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { AxiosResponse } from 'axios';
import { loadTossPayments } from '@tosspayments/payment-sdk';
import { useQuery } from 'react-query';
import { reservationActions } from '../../../redux/slice/reservationSlice';
import { ReactComponent as Exit } from '../../../icons/exit.svg';
import { ReactComponent as BottomArrow } from '../../../icons/bottom-arrow2.svg';
import './ReservationPage.scss';
import BottomButton from '../../../common/components/BottomButton';
import { getCouponList } from '../../../common/api/coupon';
import { TOSS } from '../../../constants/url.cosnt';
import AlertConfirmOne from '../../../common/dialog/AlertConfirmOne'
import { useErrorHandlers } from '../../../common/api/useErrorHandlers';
import {RootState} from '../../../redux/store'

interface CouponType {
  couponId: number
  couponManagerId: number
  couponType: string
  discountNum: number
  expireDt: string
  isUsed: number
  isValid: number
  registDt: string
  userId: number
}


function ReservationPage() {
  const { user, room, place, date } = useSelector((state: RootState) => state.persist.reservation);
  const {OS} = useSelector((state:any)=>state.persist.device);
  const [couponDropDownOpen, setCouponDropDownOpen] = useState(false);
  const [selectedCouponId, setSelectedCouponId] = useState(0);
  const [selectCouponDiscount,setSelectCouponDiscount] = useState(0)
  const [reservationName, setReservationName] = useState('');
  const dispatch = useDispatch();
  const [reservationNameConfrim,setReservationNameConfrim]=useState(false)
  const reservationNameInput = useRef<HTMLInputElement>(null);

  const { isLoading:getCouponListIsLoading, data: couponList,refetch} = useQuery(
    'getCouponList',
    () => getCouponList(user.id),
    {
      cacheTime: 1000 * 60 * 5,
      staleTime: 1000 * 60 * 3,
      refetchInterval: false,
      onError: (error: any) => {
        useErrorHandlers(dispatch, error)
      }
    },
  );


  const creditCardPayment = () => {
    const random = new Date().getTime() + Math.random()
    const randomId = btoa(random.toString())
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
          personNum: room.personNum,
        },
        date: {
          date: date.date,
          dateString: date.dateString,
          checkIn: date.checkIn.substring(0, 5),
          checkOut: date.checkOut.substring(0, 5),
        },
        coupon:{
          couponId:selectedCouponId
        }
      }),
    );
    loadTossPayments(`${process.env.REACT_APP_TOSS_CLIENT_KEY}`).then((tossPayments) => {
      tossPayments.requestPayment('카드', {
        amount: Number(room.price.toString().slice(0, -1).replace(',', '')) - selectCouponDiscount,
        orderId: randomId,
        orderName: place.name + room.name,
        customerName: user.nickname,
        successUrl: `${process.env.REACT_APP_BASE_URL}/reservation-waiting/${place.placeId}/${room.roomId}/${date.date.start}/${date.date.end}`,
        failUrl: `${process.env.REACT_APP_BASE_URL}/reservation/${place.placeId}/${room.roomId}/${date.date.start}/${date.date.end}`,
      });
    });
  };

  const handleReservationName = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setReservationName(e.target.value.replace(/ /g,""));
  },[]);

  const existCoupon = couponList?.data.map((coupon:CouponType) => {
    const priceString = coupon.discountNum.toString();
    const price = `${priceString.slice(0, priceString.length - 3)},${priceString.slice(priceString.length - 3)}`;

    return (
      <div
        className="coupon-header"
        aria-hidden="true"
        onClick={() => selectCoupon(coupon.couponId,  coupon.discountNum)}
      >
        [Delgo 가요] {price}원 할인쿠폰
      </div>
    );
  });

  const handleCouponDropDown = () => {
    setSelectedCouponId(0)
    setSelectCouponDiscount(0);
    setCouponDropDownOpen(!couponDropDownOpen);
  };

  const selectCoupon = (couponId: number, discountNum: number) => {
    setSelectedCouponId(couponId)
    setCouponDropDownOpen(false);
    setSelectCouponDiscount(discountNum);
  };

  const confirmReservationNameOpen = useCallback(() => {
    setReservationNameConfrim(true)
  },[])

  const confirmReservationNameClose = useCallback(() => {
    setReservationNameConfrim(false)
  },[])

  const inputReservationNameFocus = useCallback(() => {
    if (OS === 'android') {
      reservationNameInput.current?.scrollIntoView({ behavior: "smooth" })
    }
  }, [])

  if (getCouponListIsLoading) {
    return <div className="reservation-page">&nbsp;</div>
  }

  return (
    <>
      <div className="reservation-page">
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
            <span className="check-date">{date.checkIn}</span>
          </div>
          <div className="checkin-checkout-date">
            <span className="check-title">체크아웃</span>
            <span className="check-date">
              {date.date.end.substring(2, 4)}.{date.date.end.substring(4, 6)}.{date.date.end.substring(6, 8)}{' '}
              {date.dateString.substring(16, 19)}
            </span>
            <span className="check-date">{date.checkOut}</span>
          </div>
        </div>
        {/* <div className="reservation-devide" /> */}
        <h2 className="reservation-title first">예약자정보</h2>
        <div className="reservation-user-info">
          <div className="reservation-label">예약자 이름</div>
          <input className="reservation-user-info-name" type="text" ref={reservationNameInput} onChange={handleReservationName} onFocus={inputReservationNameFocus} />
        </div>
        <div className="reservation-user-info">
          <div className="reservation-label">핸드폰 번호</div>
          <div className="reservation-user-info-phone">{user.phone}</div>
        </div>
        <div className="reservation-user-info">
          <div className="reservation-label">예약 인원 </div>
          <div className="reservation-user-info-phone">기준 {room.personNum}명</div>
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
          <div className="coupon-sale-amount">
            {selectCouponDiscount === 0 ? <>-0원</> : <>-{selectCouponDiscount.toLocaleString()}원</>}
          </div>
        </div>
        {couponDropDownOpen === false ? (
          <div className="coupon-drop-down" aria-hidden="true" onClick={handleCouponDropDown}>
            {selectCouponDiscount === 0 ? (
              <>
                보유한 쿠폰 {couponList?.data.length}장 <BottomArrow className="coupon-bottom-arrow" />
              </>
            ) : (
              <>[Delgo 가요]{selectCouponDiscount.toLocaleString()}원 할인쿠폰 </>
            )}
          </div>
        ) : (
          <div className="coupon-drop-down-full">
            <div className="coupon-header" aria-hidden="true" onClick={handleCouponDropDown}>
              보유한 쿠폰 {couponList.data.length}장 <BottomArrow className="coupon-bottom-arrow" />
            </div>
            {existCoupon}
          </div>
        )}
        <div className="reservation-devide" />
        <div className="finalprice">
          <div className="reservation-label">결제 금액</div>
          <div className="finalprice-price">
            {(Number(room.price.toString().slice(0, -1).replace(',', '')) - selectCouponDiscount).toLocaleString()}원
          </div>
        </div>
      </div>
      <div className="reservation-payment-button" aria-hidden="true" onClick={reservationName !== '' ? creditCardPayment : confirmReservationNameOpen}>
          {(Number(room.price.toString().slice(0, -1).replace(',', '')) - selectCouponDiscount).toLocaleString()}원 결제하기
        </div>
      {reservationNameConfrim && (
        <AlertConfirmOne text="예약자명을 입력하세요" buttonHandler={confirmReservationNameClose} />
      )}
    </>
  );
}

export default ReservationPage;
