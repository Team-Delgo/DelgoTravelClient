import React from 'react';
import Modal from 'react-modal';
import './RegionSelectionModal.scss'

const regionSelectionModalStyle = {
  content: {
    position : 'fixed',
    height: '357px',
    top:'62%',
    left:'0.25%',
    right:'0.25%',
    background: '#FFFFFF',
    boxShadow: '0px -4px 10px rgba(0, 0, 0, 0.2)',
    borderRadius: '20px 20px 0px 0px',
  },
};
function RegionSelectionModal({ regionSelectionModal, closeRegionSelectionModal }) {
  return (
    <div className="region-selection-modal">
      <Modal style={regionSelectionModalStyle} isOpen={regionSelectionModal} onRequestClose={closeRegionSelectionModal}>
        <header className="region-selection-modal-header">국내 전체</header>
          <section className="region-selection-modal-section">
            <div className="region-selection-modal-region-name">제주</div>
            <div className="region-selection-modal-region-name">강원</div>
            <div className="region-selection-modal-region-name">부산</div>
            <div className="region-selection-modal-region-name">경기</div>
          </section>
          <section className="region-selection-modal-section">
            <div className="region-selection-modal-region-name">인천</div>
            <div className="region-selection-modal-region-name">전라</div>
            <div className="region-selection-modal-region-name">경상</div>
            <div className="region-selection-modal-region-name">충청</div>
          </section>
          <section className="region-selection-modal-section">
            <div className="region-selection-modal-region-name">광주</div>
            <div className="region-selection-modal-region-name">대전</div>
            <div className="region-selection-modal-region-name">대구</div>
            <div className="region-selection-modal-region-name">울산</div>
          </section>
      </Modal>
    </div>
  );
}
export default RegionSelectionModal;
