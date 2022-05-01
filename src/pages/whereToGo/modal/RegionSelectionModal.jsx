/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState, useCallback } from 'react';
import Modal from 'react-modal';
import Region from './Region';
import './RegionSelectionModal.scss';

const regionSelectionModalStyle = {
  content: {
    position: 'fixed',
    height:"40vh",
    top: '60%',
    left: '0.25%',
    right: '0.25%',
    background: '#FFFFFF',
    boxShadow: '0px -4px 10px rgba(0, 0, 0, 0.2)',
    borderRadius: '20px 20px 0px 0px',
  },
};

function RegionSelectionModal({ regionSelectionModal, closeRegionSelectionModal }) {
  const [allRegionsSelected, setAllRegionsSelected] = useState(true);

  const regions = [
    { id: 0, name: '제주', selected: false },
    { id: 2, name: '강원', selected: false },
    { id: 3, name: '부산', selected: false },
    { id: 4, name: '경기', selected: false },
    { id: 5, name: '인천', selected: false },
    { id: 6, name: '전라', selected: false },
    { id: 7, name: '경상', selected: false },
    { id: 8, name: '충청', selected: false },
    { id: 9, name: '광주', selected: false },
    { id: 10, name: '대전', selected: false },
    { id: 11, name: '대구', selected: false },
    { id: 12, name: '울산', selected: false },
  ];  

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
          <Region regions={regions} />
          {/* <Region region="제주" setSelectedPlaces={setSelectedPlaces} selectedPlaces={selectedPlaces} />
          <Region region="강원" setSelectedPlaces={setSelectedPlaces} selectedPlaces={selectedPlaces} />
          <Region region="부산" setSelectedPlaces={setSelectedPlaces} selectedPlaces={selectedPlaces} />
          <Region region="경기" setSelectedPlaces={setSelectedPlaces} selectedPlaces={selectedPlaces} />
          <Region region="인천" setSelectedPlaces={setSelectedPlaces} selectedPlaces={selectedPlaces} />
          <Region region="전라" setSelectedPlaces={setSelectedPlaces} selectedPlaces={selectedPlaces} />
          <Region region="경상" setSelectedPlaces={setSelectedPlaces} selectedPlaces={selectedPlaces} />
          <Region region="충청" setSelectedPlaces={setSelectedPlaces} selectedPlaces={selectedPlaces} />
          <Region region="광주" setSelectedPlaces={setSelectedPlaces} selectedPlaces={selectedPlaces} />
          <Region region="대전" setSelectedPlaces={setSelectedPlaces} selectedPlaces={selectedPlaces} />
          <Region region="대구" setSelectedPlaces={setSelectedPlaces} selectedPlaces={selectedPlaces} />
          <Region region="울산" setSelectedPlaces={setSelectedPlaces} selectedPlaces={selectedPlaces} /> */}
      </Modal>
    </div>
  );
}
export default RegionSelectionModal;
