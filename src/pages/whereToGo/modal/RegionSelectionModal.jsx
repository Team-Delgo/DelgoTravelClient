/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState, useCallback } from 'react';
import Modal from 'react-modal';
import Region from './Region';
import './RegionSelectionModal.scss';

const regionSelectionModalStyle = {
  content: {
    position: 'fixed',
    height: '357px',
    top: '62%',
    left: '0.25%',
    right: '0.25%',
    background: '#FFFFFF',
    boxShadow: '0px -4px 10px rgba(0, 0, 0, 0.2)',
    borderRadius: '20px 20px 0px 0px',
  },
};

function RegionSelectionModal({ regionSelectionModal, closeRegionSelectionModal }) {
  const [allRegionsSelected, setAllRegionsSelected] = useState(true);

  const handleSelectAllRegions = useCallback(() => {
    setAllRegionsSelected(!allRegionsSelected);
  }, [allRegionsSelected]);

  return (
    <div className="region-selection-modal">
      <Modal style={regionSelectionModalStyle} isOpen={regionSelectionModal} onRequestClose={closeRegionSelectionModal}>
        <div onClick={handleSelectAllRegions}>
          {allRegionsSelected ? (
            <header className="region-selection-modal-header-selected">국내 전체</header>
          ) : (
            <header className="region-selection-modal-header">국내 전체</header>
          )}
        </div>
        <section className="region-selection-modal-section">
          <Region region="제주" />
          <Region region="강원" />
          <Region region="부산" />
          <Region region="경기" />
        </section>
        <section className="region-selection-modal-section">
          <Region region="인천" />
          <Region region="전라" />
          <Region region="경상" />
          <Region region="충청" />
        </section>
        <section className="region-selection-modal-section">
          <Region region="광주" />
          <Region region="대전" />
          <Region region="대구" />
          <Region region="울산" />
        </section>
      </Modal>
    </div>
  );
}
export default RegionSelectionModal;
