/* eslint-disable array-callback-return */
import React, { useState, useEffect, useCallback } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import { AxiosResponse } from 'axios';
import { useDispatch } from 'react-redux';
import { getAllPlaces } from '../../common/api/getPlaces';
import { tokenActions } from '../../redux/reducers/tokenSlice';
import { tokenRefresh } from '../../common/api/login';
import Footer from '../../common/layouts/Footer'
import RegionSelectionModal from './modal/RegionSelectionModal'
import Place from './place/Place'
// import {RootState} from '../../redux/store'
import { ReactComponent as BottomArrow } from '../../icons/bottom-arrow.svg';
import './WhereToGo.scss';


interface PlaceType {
  address: string
  lowestPrice: string
  mainPhotoUrl: string
  name: string
  placeId: number
  registDt: string
  wishId: number
}

function WhereToGo() {
  const [places, setPlaces] = useState<Array<PlaceType>>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [areaTerm, setAreaTerm] = useState('');
  const [regionSelectionModal, setRegionSelectionModal] = useState(false);
  const userId = useSelector((state: any) => state.persist.user.user.id)
  const accessToken = useSelector((state: any) => state.token.token);
  const refreshToken = localStorage.getItem('refreshToken') || '';
  const { date, dateString } = useSelector((state: any) => state.date);
  const dispatch = useDispatch();
  const navigation = useNavigate();

  useEffect(() => {
    getAllPlaces(userId, (response: AxiosResponse) => {
      setPlaces(response.data.data);
    });
  }, []);

  useEffect(() => {
    tokenRefresh({ refreshToken }, (response: AxiosResponse) => {
      const { code } = response.data;

      if (code === 200) {
        const accessToken = response.headers.authorization_access;
        const refreshToken = response.headers.authorization_refresh;

        dispatch(tokenActions.setToken(accessToken));
        localStorage.setItem('refreshToken', refreshToken);
      } else {
        navigation('/user/signin');
      }
    });
  }, [accessToken]);


  const handleSerchTerm = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  }, []);

  const handleRegionSelectionModal = useCallback(() => {
    setRegionSelectionModal(!regionSelectionModal);
  }, [regionSelectionModal]);

  const closeRegionSelectionModal = useCallback(() => {
    setRegionSelectionModal(false);
  }, []);

  return (
    <div className="where-to-go-background">
      <input className="search-place" placeholder="숙소검색" value={searchTerm} onChange={handleSerchTerm} />
      <div className="search-region-date">
        <div className="search-region" aria-hidden="true" onClick={handleRegionSelectionModal}>
          {areaTerm === '' ? '전체' : areaTerm}
          <BottomArrow className="bottom-arrow" />
        </div>
        <div className="search-date">
          {dateString}
          <BottomArrow className="bottom-arrow" />
        </div>
      </div>
      <div className="places-container">
        {places.map((place) => {
          if (place.address.includes(areaTerm)) {
            if (place.name.includes(searchTerm)) {
              return <Place key={place.placeId} place={place} userId={userId} places={places} setPlaces={setPlaces} />;
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