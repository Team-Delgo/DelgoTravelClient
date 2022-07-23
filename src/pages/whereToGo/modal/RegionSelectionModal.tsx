import React from 'react';
import Sheet from 'react-modal-sheet';
import Region from './Region';


function RegionSelectionModal({ regionSelectionModal, closeRegionSelectionModal, areaTerm, setAreaTerm }:any) {
  return (
    <Sheet
      isOpen={regionSelectionModal}
      onClose={closeRegionSelectionModal}
      snapPoints={[500, 500, 100, 0]}
    >
      <Sheet.Container>
      <Sheet.Header />
        <Sheet.Content>
        <Region setAreaTerm={setAreaTerm} areaTerm={areaTerm} closeRegionSelectionModal={closeRegionSelectionModal}/>
        </Sheet.Content>
      </Sheet.Container>
      <Sheet.Backdrop />
    </Sheet>
  );
}
export default RegionSelectionModal;
