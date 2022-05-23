/* eslint-disable array-callback-return */
import React, { useState, useEffect, useCallback } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import { AxiosResponse } from 'axios';
import classNames from 'classnames';
import { useDispatch } from 'react-redux';
import axios from 'axios'
import { useQuery, useQueryClient } from 'react-query'
import { getAllPlaces } from '../../common/api/getPlaces';
import { tokenActions } from '../../redux/reducers/tokenSlice';
import { tokenRefresh } from '../../common/api/login';
import Footer from '../../common/components/Footer'
import RegionSelectionModal from './modal/RegionSelectionModal'
import Place from './place/Place'
// import {RootState} from '../../redux/store'
import { ReactComponent as BottomArrow } from '../../icons/bottom-arrow.svg';
import './WhereToGo.scss';
import Calender from '../calender/Calender';


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
  const userId = useSelector((state: any) => state.persist.user.user.id);
  const accessToken = useSelector((state: any) => state.token.token);
  const refreshToken = localStorage.getItem('refreshToken') || '';
  const [isCalenderOpen, setIsCalenderOpen] = useState(false);
  const [selectedDateString, setSelectedDateString] = useState('');
  const [selectedDate, setSelectedDate] = useState({ start: '', end: '' });
  const { date, dateString } = useSelector((state: any) => state.date);
  const sequence = dateString.length ? 2 : 0;
  const dispatch = useDispatch();
  const navigation = useNavigate();



  const { isLoading, error, data, isFetching } = useQuery(
    'todos',
    () => fetch(`http://49.50.161.156/place/selectWheretogo?userId=${userId}`).then((res) => res.json()),
    {
      cacheTime: 0, // cacheTime : 언마운트된 후 어느 시점까지 메모리에 데이터를 저장하여 캐싱할 것인지를 결정함.
      staleTime: 10000, // staleTime : 마운트 되어 있는 시점에서 데이터가 구식인지 판단함.
      refetchInterval:false, // 데이터 변경시 fetch하는시간 // default:false : db 데이터값 변경하면 즉시 변경
    },
  );
  console.log(isLoading,error,isFetching)
  console.log(data)
  // useEffect(() => {
  //   // getAllPlaces(userId, (response: AxiosResponse) => {
  //   //   setPlaces(response.data.data);
  //   // });
  //   setPlaces(data.data)
  // }, [data]);


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

  const handleCalenderOpenClose = useCallback(() => {
    setIsCalenderOpen(!isCalenderOpen);
  }, [isCalenderOpen]);

  return (
    <>
      {isCalenderOpen && <Calender closeCalender={handleCalenderOpenClose} />}
      <div className={classNames('where-to-go-background', { close: isCalenderOpen })}>
        <input className="search-place" placeholder="숙소검색" value={searchTerm} onChange={handleSerchTerm} />
        <div className="search-region-date">
          <div className="search-region" aria-hidden="true" onClick={handleRegionSelectionModal}>
            {areaTerm === '' ? '전체' : areaTerm}
            <BottomArrow className="bottom-arrow" />
          </div>
          <div className="search-date" aria-hidden="true" onClick={handleCalenderOpenClose}>
            {dateString}
            <BottomArrow className="bottom-arrow" />
          </div>
        </div>
        <div className="places-container">
          {data?.data.map((place:PlaceType) => {
            if (place.address.includes(areaTerm)) {
              if (place.name.includes(searchTerm)) {
                return <Place key={place.placeId} place={place} places={places} setPlaces={setPlaces} />;
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
    </>
  );
}

export default WhereToGo;