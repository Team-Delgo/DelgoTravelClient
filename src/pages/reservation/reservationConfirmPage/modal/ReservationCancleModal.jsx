/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import Sheet from 'react-modal-sheet';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import {bookingCancle} from '../../../../common/api/booking'
import './ReservationCancleModal.scss'

function ReservationCancleModal({ reservationCancleModal, closeReservationCancleModal,bookingId }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cancleReservation = () => {
    bookingCancle(
      bookingId,
      (response) => {
        if (response.data.code === 200) {
          console.log('성공')
          setTimeout(() => {
            navigate(`/reservation-cancle/${bookingId}`);
          }, 100)
        }
      },
      dispatch,
    );
  }

  return (
    <Sheet isOpen={reservationCancleModal} onClose={closeReservationCancleModal} snapPoints={[500, 500, 100, 0]}>
      <Sheet.Container>
        <Sheet.Header />
        <Sheet.Content>
          <div className="reservation-cancle-confirm">
            <h3 className="reservation-cancle-confirm-label">예약을 취소하시겠어요?</h3>
            <div className="reservation-cancle-place-info">
              <header className="reservation-cancle-place-info-name">밸런스독</header>
              <div className="reservation-cancle-place-info-address">경기도 양평시 지평균 바깥균 1길 32-19</div>
              <div className="reservation-cancle-place-info-room-type">온수풀,더블베드타입</div>
              <div className="reservation-cancle-place-info-date">22.05.06(월) - 22.05.07(화)</div>
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
    // <Modal style={regionSelectionModalStyle} isOpen={reservationCancleModal} onRequestClose={closeReservationCancleModal} ariaHideApp={false}>
    //   <div className="reservation-cancle-confirm">
    //     <h3 className="reservation-cancle-confirm-label">예약을 취소하시겠어요?</h3>
    //     <div className="reservation-cancle-place-info">
    //       <header className="reservation-cancle-place-info-name">밸런스독</header>
    //       <div className="reservation-cancle-place-info-address">경기도 양평시 지평균 바깥균 1길 32-19</div>
    //       <div className="reservation-cancle-place-info-room-type">온수풀,더블베드타입</div>
    //       <div className="reservation-cancle-place-info-date">22.05.06(월) - 22.05.07(화)</div>
    //     </div>
    //     <div className="reservation-cancle-button-container">
    //       <button type='button' className="reservation-cancle-button" onClick={cancleReservation}>네</button>
    //       <button type='button' className="reservation-cancle-button" onClick={closeReservationCancleModal}>아니요</button>
    //     </div>
    //   </div>
    // </Modal>
  );
}
export default ReservationCancleModal;
