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
// import ReservationCancleModal from "./modal/ReservationCancleModal";
import './ReservationCanclePage.scss';




function ReservationCanclePage() {
  const navigate = useNavigate();
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
    point: 0,
    registDt: "",
    roomName: "",
    startDt: "",
    userName: "",
    userPhoneNo: "",
    place:{
      address: "",
      checkin: "",
      checkout: "",
      isBooking: 0,
      lowestPrice: null,
      mainPhotoUrl: "",
      name: "",
      placeId: 0,
      wishId: 0
    }
  })
  const { bookingId } = useParams();

  useEffect(() => {
    window.scrollTo(0, 0);
    // if (bookingId !== undefined) {
    //   bookingGetData(
    //     { bookingId, accessToken },
    //     (response: AxiosResponse) => {
    //       setReservationData(response.data.data);
    //       console.log(response.data.data)
    //     },
    //     dispatch,
    //   );
    // }
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
      <div className="reservationCanclePage">
        <div className="header">
          <Exit className="exit-button" onClick={moveToMainPage} />
          <h1 className="header-title">예약취소</h1>
        </div>
        <div className="reservation-cancle-box">
          예약이 취소 되었습니다. 환불은 주말/공휴일을 제외한 영업일 기준 3-5일 소요될 수 있습니다.
        </div>
        <h2 className="reservation-title first">예약정보</h2>
        <div className="reservation-info">
          <div className="reservation-info-first-line">
            <div className="reservation-info-first-line-number-label">예약번호</div>
            <div className="reservation-info-first-line-number">12345678</div>
          </div>
          <div className="reservation-info-second-line">
            <div className="reservation-info-second-line-name-label">예약자 이름</div>
            <div className="reservation-info-second-line-name">
              이창민 / 01012345678
            </div>
          </div>
        </div>
        <div className="reservation-devide" />
        <h2 className="reservation-title second">결제 정보</h2>
        <div className="original-price">
          <div className="reservation-label">상품가격(1박)</div>
          <div className="original-price-amount">100.000원</div>
        </div>
        <div className="pointsale">
          <div className="reservation-label">결제 시 포인터 사용</div>
          <div className="pointsale-amount">-1000P</div>
        </div>
        <div className="couponsale">
          <div className="reservation-label">결제 시 쿠폰 사용</div>
          <div className="couponsale-amount">0원</div>
        </div>
        <div className="reservation-devide" />
        <div className="finalprice">
          <div className="reservation-label">결제 금액</div>
          <div className="finalprice-price">99.000원</div>
        </div>
        <div className="refund-payment-methods">
          <div className="refund-payment-methods-label">결제 수단</div>
          <div className="refund-payment-methods-price">신용카드</div>
        </div>
        <div className="reservation-refund">
          <h2 className="reservation-title second">취소/환불 정보</h2>
          <div className="original-price">
            <div className="reservation-label">취소상태</div>
            <div className="original-price-amount">취소완료</div>
          </div>
          <div className="couponsale">
            <div className="reservation-label">결제 시 포인터 사용</div>
            <div className="couponsale-amount">-1.000P</div>
          </div>
          <div className="couponsale">
            <div className="reservation-label">결제 시 쿠폰 사용</div>
            <div className="couponsale-amount">0원</div>
          </div>
          <div className="reservation-devide" />
          <div className="refund-point">
            <div className="refund-point-label">포인트 환불</div>
            <div className="refund-point-price">1,000원</div>
          </div>
          <div className="refund-payment-methods">
            <div className="refund-payment-methods-label">환불방법</div>
            <div className="refund-payment-methods-price">신용카드 환불</div>
          </div>
          <div className="finalprice">
            <div className="reservation-label">최종 환불금액</div>
            <div className="finalprice-price">99.000원</div>
          </div>
        </div>
      </div>
      <BottomButton text="예약내역 공유하기" />
    </>
  );
}

export default ReservationCanclePage;