/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import Modal from 'react-modal';
import './ReservationCancleModal.scss'

const regionSelectionModalStyle = {
  content: {
    position: 'fixed',
    height: '47vh',
    top: '49vh',
    left: '0.25%',
    right: '0.25%',
    background: '#FFFFFF',
    boxShadow: '0px -4px 10px rgba(0, 0, 0, 0.2)',
    borderRadius: '20px 20px 0px 0px',
    touchAction:"none",
  },
  overlay: {zIndex: 10},
};

function ReservationCancleModal({ reservationCancleModal, closeReservationCancleModal }) {
  return (
      <Modal style={regionSelectionModalStyle} isOpen={reservationCancleModal} onRequestClose={closeReservationCancleModal} ariaHideApp={false}>
        <div className="reservation-cancle-confirm">
        <h3 className="reservation-cancle-confirm-label">예약을 취소하시겠어요?</h3>
        <div className="reservation-cancle-place-info">
          <header className="reservation-cancle-place-info-name">밸런스독</header>
          <div className="reservation-cancle-place-info-address">경기도 양평시 지평균 바깥균 1길 32-19</div>
          <div className="reservation-cancle-place-info-room-type">온수풀,더블베드타입</div>
          <div className="reservation-cancle-place-info-date">22.05.06(월) - 22.05.07(화)</div>
        </div>
        <div className="reservation-cancle-button-container">
          <button type='button' className="reservation-cancle-button">네</button>
          <button type='button' className="reservation-cancle-button">아니요</button>
        </div>
      </div>
    </Modal>
  );
}
export default ReservationCancleModal;
