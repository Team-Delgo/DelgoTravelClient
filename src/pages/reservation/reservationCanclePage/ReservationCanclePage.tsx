import React,{useCallback,useEffect, useState} from "react";
import { useSelector,useDispatch } from "react-redux";
import { useNavigate,useParams} from 'react-router-dom';
import { AxiosResponse } from 'axios';
import { ReactComponent as Exit } from '../../../common/icons/exit.svg';
import { reservationActions } from '../../../redux/slice/reservationSlice';
import {RootState} from '../../../redux/store'
import {bookingGetData} from '../../../common/api/booking'
import './ReservationCanclePage.scss';
import { ROOT_PATH } from "../../../common/constants/path.const";




function ReservationCanclePage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { bookingId } = useParams();
  const accessToken = useSelector((state: RootState) => state.token.token);
  const [reservationData, setReservationData] = useState({
    bookingId: "",
    bookingState: "",
    canCancelDate: "",
    commission:"",
    couponId: 0,
    couponPrice: "",
    endDt: "",
    finalPrice: "",
    originalPrice: "",
    point: 0,
    refund:"",
    registDt: "",
    roomName: "",
    startDt: "",
    reservedName: "",
    userPhoneNo: "",
    place:{
      address: "",
      checkin: "",
      checkout: "",
      isBooking: 0,
      lowestPrice: null,
      mainPhotoUrl: "",
      mapUrl:"",
      name: "",
      placeId: 0,
      phoneNo:"",
      policy:"",
      wishId: 0
    }
  })

  useEffect(() => {
    window.scrollTo(0, 0);
    if (bookingId !== undefined) {
      bookingGetData(
        { bookingId, accessToken },
        (response: AxiosResponse) => {
          setReservationData(response.data.data);
        },
        dispatch,
      );
    }
  }, []);

  const moveToMainPage = () => {
    setTimeout(() => {
      navigate(ROOT_PATH);
      dispatch(
        reservationActions.reservationInit()
      )
    }, 300);
  }

  return (
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
            <div className="reservation-info-first-line-number">{reservationData.bookingId}</div>
          </div>
          <div className="reservation-info-second-line">
            <div className="reservation-info-second-line-name-label">예약자 이름</div>
            <div className="reservation-info-second-line-name">
            {reservationData.reservedName} / {reservationData.userPhoneNo}
            </div>
          </div>
        </div>
        <div className="reservation-devide" />
        <h2 className="reservation-title second">결제 정보</h2>
        <div className="original-price">
          <div className="reservation-label">상품가격</div>
          <div className="original-price-amount">{reservationData.originalPrice}</div>
        </div>
        <div className="pointsale">
          <div className="reservation-label">결제 시 포인터 사용</div>
          <div className="pointsale-amount">-0P</div>
        </div>
        <div className="couponsale">
          <div className="reservation-label">결제 시 쿠폰 사용</div>
          <div className="couponsale-amount">-{reservationData.couponPrice}</div>
        </div>
        <div className="reservation-devide" />
        <div className="finalprice">
          <div className="reservation-label">결제 금액</div>
          <div className="finalprice-price">{reservationData.finalPrice}</div>
        </div>
        <div className="refund-payment-methods">
          <div className="refund-payment-methods-label">결제 수단</div>
          <div className="refund-payment-methods-price">신용카드</div>
        </div>
        <div className="reservation-refund">
          <h2 className="reservation-title second">취소/환불 정보</h2>
          <div className="original-price">
            <div className="reservation-label">취소상태</div>
              {
                reservationData.bookingState=== "CW" ? <div className="original-price-amount">취소 접수 확인중</div>:
                <div className="original-price-amount">취소완료</div>
              }
          </div>
          <div className="couponsale">
            <div className="reservation-label">포인트 환불</div>
            <div className="couponsale-amount">0P</div>
          </div>
          <div className="couponsale">
            <div className="reservation-label">쿠폰 환불</div>
            <div className="couponsale-amount">{reservationData.couponPrice}</div>
          </div>
          <div className="reservation-devide" />
          <div className="refund-payment-methods">
            <div className="refund-payment-methods-label">환불방법</div>
            <div className="refund-payment-methods-price">신용카드 환불</div>
          </div>
          <div className="finalprice">
            <div className="reservation-label">최종 환불금액</div>
            <div className="finalprice-price">{reservationData.finalPrice}</div>
          </div>
        </div>
      </div>
  );
}

export default ReservationCanclePage;