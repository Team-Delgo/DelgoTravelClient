import React,{useCallback,useEffect, useState} from "react";
import { useSelector,useDispatch } from "react-redux";
import { useNavigate,useParams,useLocation} from 'react-router-dom';
import { AxiosResponse } from 'axios';
import { ReactComponent as Exit } from '../../../icons/exit.svg';
import { reservationActions } from '../../../redux/slice/reservationSlice';
import {bookingGetData} from '../../../common/api/booking'
import ReservationCancleModal from "./modal/ReservationCancleModal";
import Map from '../../../common/utils/Map';
import {RootState} from '../../../redux/store'
import './ReservationConfirmPage.scss';
import { ROOT_PATH } from "../../../constants/path.const";

declare global{
  interface Window{
    BRIDGE:any
    webkit:any
  }
}

function ReservationConfirmPage() {
  const navigate = useNavigate();
  const accessToken = useSelector((state: RootState) => state.token.token);
  const dispatch = useDispatch();
  const [reservationCancleModal, setReservationCancleModal] = useState(false);
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
  const { bookingId } = useParams();
  const {OS} = useSelector((state:any)=>state.persist.device);

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
    window.addEventListener("android", async (e:any) => {
      console.log(e.detail);
  });
  }, []);

  const moveToPrevPage = useCallback(() => {
    setTimeout(() => {
      navigate(ROOT_PATH);
      dispatch(
        reservationActions.reservationInit()
      );
    }, 100);
  }, []);



  const openReservationCancleModal = useCallback(() => {
    setReservationCancleModal(true);
  }, []);

  const closeReservationCancleModal  = useCallback(() => {
    setReservationCancleModal(false);
  }, []);

  const copyPlaceAddress = useCallback(() => {
    console.log(OS)
    if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(reservationData.place.address)
    if(OS==='android'){
      window.BRIDGE.copyToClipboard(reservationData.place.address)
    }
    else{
      window.webkit.messageHandlers.copyToClipboard.pushMessage(reservationData.place.address)
    }
  }
  }, [reservationData]);

  const copyReservationNumber = useCallback(() => {
    if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(reservationData.bookingId)
    if(OS==='android'){
      window.BRIDGE.copyToClipboard(reservationData.place.address)
    }
    else{
      window.webkit.messageHandlers.copyToClipboard.pushMessage(reservationData.place.address)
    }
  }
  }, [reservationData]);


  const getDate = (date:string) => { 
      const week = ['일', '월', '화', '수', '목', '금', '토'];
      const dayOfWeek = week[new Date(date).getDay()];
      return dayOfWeek;
  }

  return (
    <>
      <div className="reservationPage">
        <div className="header">
          <Exit className="exit-button" onClick={moveToPrevPage} />
          {reservationData.bookingState === 'W' ? (
            <header className="header-title">예약접수 확인중</header>
          ) : (
            <header className="header-title">예약확정</header>
          )}
        </div>
        <div className="placeinfo">
            <div className="placeinfo-wrapper">
              <div className="placeinfo-name">{reservationData.place.name}</div>
            </div>
          <p className="placeinfo-address">{reservationData.place.address}</p>
          <p className="placeinfo-room">{reservationData.roomName}</p>
        </div>
        <div className="place-use-info">
          <a href={`tel: ${reservationData.place.phoneNo}`}><div>숙소문의</div></a>
          <div aria-hidden="true" onClick={copyPlaceAddress}>주소복사</div>
          <a href={reservationData.place.mapUrl}><div >지도보기</div></a>
        </div>
        <div className="checkin-checkout">
          <div className="checkin-checkout-date">
            <span className="check-title">체크인</span>
            <span className="check-date">
              {reservationData.startDt.substring(2, 4)}.{reservationData.startDt.substring(5, 7)}.
              {reservationData.startDt.substring(8, 10)}({getDate(reservationData.startDt)})
            </span>
            <span className="check-date">{reservationData.place.checkin.substring(0, 5)}</span>
          </div>
          <div className="checkin-checkout-date">
            <span className="check-title">체크아웃</span>
            <span className="check-date">
              {reservationData.endDt.substring(2, 4)}.{reservationData.endDt.substring(5, 7)}.
              {reservationData.endDt.substring(8, 10)}({getDate(reservationData.endDt)})
            </span>
            <span className="check-date">{reservationData.place.checkout.substring(0, 5)}</span>
          </div>
        </div>
        <div className="reservation-info-header">
          <div className="reservation-info-header-label">예약정보</div>
          <div className="reservation-number-copy" aria-hidden="true" onClick={copyReservationNumber}>예약번호 복사</div>
        </div>
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
          {/* <div className="reservation-user-info">
          <div className="reservation-label">예약 인원  </div>
          <div className="reservation-user-info-phone">
            기준 {room.personNum}명 / 기준 {room.petNum}마리
          </div>
        </div> */}
        </div>
        <div className="reservation-devide" />
        <h2 className="reservation-title second">결제 정보</h2>
        <div className="original-price">
          <div className="reservation-label">상품가격</div>
          <div className="original-price-amount">{reservationData.originalPrice}</div>
        </div>
        <div className="couponsale">
          <div className="reservation-label">결제 시 포인터 사용</div>
          <div className="couponsale-amount">-{reservationData.point}P</div>
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
        <div className="payment-methods">
          <div className="payment-methods-label">결제 수단</div>
          <div className="payment-methods-price">신용카드</div>
        </div>
        <div className="cancel-reservation">
          <div className="cancel-reservation-label">
            {reservationData.canCancelDate.substring(0, 4)}년 {reservationData.canCancelDate.substring(5, 7)}월{' '}
            {reservationData.canCancelDate.substring(8, 10)}일까지 무료 취소 가능합니다.
          </div>
          <button className="cancel-reservation-button" type="button" onClick={openReservationCancleModal}>
            예약취소
          </button>
        </div>
        <div className="reservation-place-map">
        <header className="reservation-place-map-header">지도</header>
        {reservationData.place.address ? <Map address={reservationData.place.address} /> : null}
      </div>
      </div>
        <ReservationCancleModal
          openReservationCancleModal={reservationCancleModal}
          closeReservationCancleModal={closeReservationCancleModal}
          reservationData={reservationData}
        />
    </>
  );
}

export default ReservationConfirmPage;