import React from 'react';
import Sheet from 'react-modal-sheet';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import {bookingCancle} from '../../../../common/api/booking'
import './ReservationCancleModal.scss'

interface ReservationCancleModalProps{
  openReservationCancleModal: boolean;
  closeReservationCancleModal: () => void;
  reservationData:reservationDataType;
}

interface reservationDataType{
  bookingId: string
  bookingState: string
  canCancelDate: string
  commission:string
  couponId: number
  couponPrice: string
  endDt:string
  finalPrice: string
  originalPrice: string
  point: number
  refund:string
  registDt: string
  roomName: string
  startDt: string
  reservedName: string
  userPhoneNo: string
  place:{
    address: string
    checkin: string
    checkout: string
    isBooking: number
    lowestPrice: null
    mainPhotoUrl: string
    name: string
    placeId: number
    phoneNo:string
    policy:string
    wishId: number
  }
}

function ReservationCancleModal({ openReservationCancleModal, closeReservationCancleModal,reservationData }:ReservationCancleModalProps) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cancleReservation = () => {
    bookingCancle(
      reservationData.bookingId,
      (response) => {
        if (response.data.code === 200) {
          console.log('성공')
          setTimeout(() => {
            navigate(`/reservation-cancle/${reservationData.bookingId}`);
          }, 100)
        }
      },
      dispatch,
    );
  }

  const getDate = (date:string) => { 
    const week = ['일', '월', '화', '수', '목', '금', '토'];
    const dayOfWeek = week[new Date(date).getDay()];
    return dayOfWeek;
}


  return (
    <Sheet isOpen={openReservationCancleModal} onClose={closeReservationCancleModal} snapPoints={[500, 500, 100, 0]}>
      <Sheet.Container>
        <Sheet.Header />
        <Sheet.Content>
          <div className="reservation-cancle-confirm">
            <h3 className="reservation-cancle-confirm-label">예약을 취소하시겠어요?</h3>
            <div className="reservation-cancle-place-info">
              <header className="reservation-cancle-place-info-name">{reservationData.place.name}</header>
              <div className="reservation-cancle-place-info-date">
                {reservationData.startDt.substring(2, 4)}.{reservationData.startDt.substring(5, 7)}.
                {reservationData.startDt.substring(8, 10)}({getDate(reservationData.startDt)}) -{' '}
                {reservationData.endDt.substring(2, 4)}.{reservationData.endDt.substring(5, 7)}.
                {reservationData.endDt.substring(8, 10)}({getDate(reservationData.endDt)})
              </div>
              <div className="reservation-cancle-place-info-address">{reservationData.place.address}</div>
              <div className="reservation-cancle-place-info-room-type">{reservationData.roomName}</div>
              <div className="reservation-cancle-devide" />
              <div className="reservation-cancle-payment-price">
                <div className="reservation-cancle-payment-price-label">결제금액</div>
                <div className="reservation-cancle-payment-price-amount">{reservationData.finalPrice}</div>
              </div>
              <div className="reservation-cancle-cancellation-fee">
                <div className="reservation-cancle-cancellation-fee-label">취소 수수료</div>
                <div className="reservation-cancle-cancellation-fee-amount">-{reservationData.commission}</div>
              </div>
              <div className="reservation-cancle-refund-price">
                <div className="reservation-cancle-refund-price-label">환불금액</div>
                <div className="reservation-cancle-refund-price-amount">{reservationData.refund}</div>
              </div>
            </div>
            <div className="reservation-cancle-button-container">
              <button type="button" className="reservation-cancle-button" onClick={cancleReservation}>
                네
              </button>
              <button type="button" className="reservation-cancle-button" onClick={closeReservationCancleModal}>
                아니요
              </button>
            </div>
          </div>
        </Sheet.Content>
      </Sheet.Container>
      <Sheet.Backdrop />
    </Sheet>
  );
}
export default ReservationCancleModal;
