/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable array-callback-return */

import React,{useState,useEffect,useCallback} from 'react'
import { AxiosResponse } from 'axios';
import getAllPlaces from '../../common/api/getAllPlaces';
import Footer from '../../common/layouts/Footer'
import RegionSelectionModal from './modal/RegionSelectionModal'
import Place from './place/Place'
import { ReactComponent as BottomArrow } from '../../icons/bottom-arrow.svg';
import './WhereToGo.scss';

interface PlaceType  {
  address: string
  lowestPrice: string
  mainPhotoUrl: string
  name: string
  placeId: number
  registDt: string
}

function WhereToGo() {
  const [places, setPlaces] = useState<Array<PlaceType>>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [areaTerm, setAreaTerm] = useState('');
  const [regionSelectionModal, setRegionSelectionModal] = useState(false);


  useEffect(() => {
    getAllPlaces((response: AxiosResponse) => {
      setPlaces(response.data.data);  
    });
  }, []);

  const handleSerchTerm = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  }, []);

  const handleRegionSelectionModal = useCallback(() => {
      setRegionSelectionModal(!regionSelectionModal);
    },[regionSelectionModal]);

  const closeRegionSelectionModal = useCallback(() => {
    setRegionSelectionModal(false);
  }, []);

  console.log(areaTerm)

  return (
    <div className="where-to-go-background">
      <input className="search-place" placeholder="숙소검색" value={searchTerm} onChange={handleSerchTerm} />
      <div className="search-region-date">
        <div className="search-region" onClick={handleRegionSelectionModal}>
          {areaTerm === '' ? '전체' : areaTerm}
          <BottomArrow className="bottom-arrow" />
        </div>
        <div className="search-date">
          22.03.01 - 22.03.22 / 1박
          <BottomArrow className="bottom-arrow" />
        </div>
      </div>
      <div className="places-container">
        {places.map((place) => {
          if (place.address.includes(areaTerm)) {
            if (place.name.includes(searchTerm)) {
              return <Place key={place.placeId} place={place} />;
            }
          }
        })}
      </div>
      <Footer />
      <RegionSelectionModal
        regionSelectionModal={regionSelectionModal}
        closeRegionSelectionModal={closeRegionSelectionModal}
        setAreaTerm={setAreaTerm}
        areaTerm={areaTerm}
      />
    </div>
  );
}

export default WhereToGo;