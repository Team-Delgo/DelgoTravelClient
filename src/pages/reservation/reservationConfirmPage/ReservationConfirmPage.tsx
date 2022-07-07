import React,{useCallback,useEffect, useState} from "react";
import { useSelector,useDispatch } from "react-redux";
import { useNavigate,useParams} from 'react-router-dom';
import { AxiosResponse } from 'axios';
import { ReactComponent as Exit } from '../../../icons/exit.svg';
import RightArrow from "../../../icons/right-arrow.svg";
import RightArrowBlack from "../../../icons/right-arrow-black.svg";
import BottomButton from "../../../common/components/BottomButton";
import { reservationActions } from '../../../redux/slice/reservationSlice';
import {bookingGetData} from '../../../common/api/booking'
import ReservationCancleModal from "./modal/ReservationCancleModal";
import './ReservationConfirmPage.scss';




function ReservationConfirmPage() {
  const navigate = useNavigate();
  const {user} = useSelector((state: any) => state.persist.user);
  const { room, place,date } = useSelector((state: any) => state.persist.reservation);
  const accessToken = useSelector((state: any) => state.token.token);
  const dispatch = useDispatch();
  const [reservationCancleModal, setReservationCancleModal] = useState(false);
  const [reservationData, setReservationData] = useState({
    bookingId: "",
    bookingState: "",
    canCancelDate: "",
    couponId: 0,
    couponPrice: "",
    endDt: "",
    finalPrice: "",
    originalPrice: "",
    placeAddress: "",
    placeName: "",
    point: 0,
    roomName: "",
    startDt: "",
    userName: "",
    userPhoneNo: ""
  })
  const { bookingId } = useParams();

  useEffect(() => {
    window.scrollTo(0, 0);
    if (bookingId !== undefined) {
      bookingGetData(
        { bookingId, accessToken },
        (response: AxiosResponse) => {
          setReservationData(response.data.data);
          console.log(response.data.data)
        },
        dispatch,
      );
    }
  }, []);

  const moveToMainPage = useCallback(() => {
    setTimeout(() => {
      navigate('/');
      dispatch(
        reservationActions.reservation({
          user: { id: 0, nickname: '', email: '', phone: '' },
          place: { placeId: 0, name: '', address: '' },
          room: {
            roomId: 0,
            name: '',
            checkin: '',
            checkout: '',
            price: 0,
            images: [],
          },
          date: {
            date:'',
            dateString:''
          },
        }),
      );
    }, 300);
  }, []);


  const handleReservationCancleModal = useCallback(() => {
    setReservationCancleModal(!reservationCancleModal);
  }, [reservationCancleModal]);

  const closeReservationCancleModal  = useCallback(() => {
    setReservationCancleModal(false);
  }, []);

  return (
    <>
      <div className="reservationPage">
        <div className="header">
          <Exit className="exit-button" onClick={moveToMainPage} />
          {
            reservationData.bookingState === "W" ? <h1 className="header-title">예약접수 확인</h1>
            : <h1 className="header-title">예약확정</h1>
          }
        </div>
        <div className="placeinfo">
          <div className="placeinfo-wrapper">
            <div className="placeinfo-name">{reservationData.placeName}</div>
            <img src={RightArrow} alt="detail" />
          </div>
          <p className="placeinfo-address">{reservationData.placeAddress}</p>
          {/* <p className="placeinfo-room">502호 [온수풀, 더블베드타입]</p> */}
        </div>
        <div className="checkin-checkout">  
          <div className="checkin-checkout-date">
            <span className="check-title">체크인</span>
            <span className="check-date">
              {/* {date.date.start.substring(2, 4)}.{date.date.start.substring(4, 6)}.{date.date.start.substring(6, 8)}{' '}
              {date.dateString.substring(5, 8)} */}
              {reservationData.startDt.substring(2, 4)}.{reservationData.startDt.substring(5, 7)}.{reservationData.startDt.substring(8, 10)}{' '}
              {/* {reservationData.startDt.substring(5, 8)} */}
            </span>
          </div>
          <div className="checkin-checkout-date">
            <span className="check-title">체크아웃</span>
            <span className="check-date">
              {reservationData.endDt.substring(2, 4)}.{reservationData.endDt.substring(5, 7)}.{reservationData.endDt.substring(8, 10)}{' '}
              {/* {reservationData.endDt.substring(16, 19)} */}
            </span>
          </div>
        </div>
        <h2 className="reservation-title first">예약정보</h2>
        <div className="reservation-info">
          <div className="reservation-info-first-line">
            <div className="reservation-info-first-line-number-label">예약번호</div>
            <div className="reservation-info-first-line-number">{reservationData.bookingId}</div>
          </div>
          <div className="reservation-info-second-line">
            <div className="reservation-info-second-line-name-label">예약자 이름</div>
            <div className="reservation-info-second-line-name">
              {reservationData.userName} / {reservationData.userPhoneNo}
            </div>
          </div>
        </div>
        <div className="reservation-devide" />
        <h2 className="reservation-title second">결제 정보</h2>
        <div className="original-price">
          <div className="reservation-label">상품가격(1박)</div>
          <div className="original-price-amount">{reservationData.originalPrice}</div>
        </div>
        <div className="couponsale">
          <div className="reservation-label">결제 시 포인터 사용</div>
          <div className="couponsale-amount">-{reservationData.point}P</div>
        </div>
        <div className="couponsale">
          <div className="reservation-label">결제 시 쿠폰 사용</div>
          <div className="couponsale-amount">{reservationData?.couponPrice}</div>
        </div>
        <div className="reservation-devide" />
        <div className="finalprice">
          <div className="reservation-label">결제 금액</div>
          <div className="finalprice-price">{reservationData.finalPrice}</div>
        </div>
        <div className="payment-methods">
          <div className="payment-methods-label">결제 수단</div>
          <div className="payment-methods-price">신용카드</div>
        </div>
        <div className="view-policy">
          {place.name} 정책보기
          <img src={RightArrowBlack} alt="detail" />
        </div>
        <div className="cancel-reservation">
          <div className="cancel-reservation-label">
            {reservationData.canCancelDate.substring(0, 4)}년 {reservationData.canCancelDate.substring(5, 7)}월 {reservationData.canCancelDate.substring(8, 10)}일
            18:00까지 무료 취소 가능합니다.</div>
          <button className="cancel-reservation-button" type="button" onClick={handleReservationCancleModal}>예약취소</button>
        </div>
      </div>
      {
        reservationCancleModal && <ReservationCancleModal
          reservationCancleModal={handleReservationCancleModal}
          closeReservationCancleModal={closeReservationCancleModal}
        />
      }
      <BottomButton text="예약내역 공유하기" />
    </>
  );
}

export default ReservationConfirmPage;