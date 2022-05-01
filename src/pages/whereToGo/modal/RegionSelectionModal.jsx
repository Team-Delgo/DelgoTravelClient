/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState, useCallback } from 'react';
import Modal from 'react-modal';
import Region from './Region';


const regionSelectionModalStyle = {
  content: {
    position: 'fixed',
    height: '40vh',
    top: '60%',
    left: '0.25%',
    right: '0.25%',
    background: '#FFFFFF',
    boxShadow: '0px -4px 10px rgba(0, 0, 0, 0.2)',
    borderRadius: '20px 20px 0px 0px',
  },
};

function RegionSelectionModal({ regionSelectionModal, closeRegionSelectionModal,areaTerm, setAreaTerm }) {
  const [allRegionsSelected, setAllRegionsSelected] = useState(true);

  const handleSelectAllRegions = useCallback(() => {
    setAllRegionsSelected(!allRegionsSelected);
    setAreaTerm('');
  }, [allRegionsSelected]);


  return (
      <Modal style={regionSelectionModalStyle} isOpen={regionSelectionModal} onRequestClose={closeRegionSelectionModal}>
        <Region setAreaTerm={setAreaTerm}/>
      </Modal>
  );
}
export default RegionSelectionModal;
