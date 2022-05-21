/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import Modal from 'react-modal';
import Region from './Region';


const regionSelectionModalStyle = {
  content: {
    position: 'fixed',
    height: '357px',
    top: '60%',
    left: '0.25%',
    right: '0.25%',
    background: '#FFFFFF',
    boxShadow: '0px -4px 10px rgba(0, 0, 0, 0.2)',
    borderRadius: '20px 20px 0px 0px',
  },
};

function RegionSelectionModal({ regionSelectionModal, closeRegionSelectionModal,areaTerm, setAreaTerm }) {
  return (
      <Modal style={regionSelectionModalStyle} isOpen={regionSelectionModal} onRequestClose={closeRegionSelectionModal} ariaHideApp={false}>
        <Region setAreaTerm={setAreaTerm} areaTerm={areaTerm}/>
      </Modal>
  );
}
export default RegionSelectionModal;
