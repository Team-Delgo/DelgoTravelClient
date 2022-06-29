/* eslint-disable array-callback-return */
import React, { useState, useEffect, useCallback,useMemo } from 'react'
import { useNavigate,useLocation } from 'react-router-dom';
import { useSelector } from "react-redux";
import { AxiosResponse } from 'axios';
import classNames from 'classnames';
import { useDispatch } from 'react-redux';
import { useQuery } from 'react-query'
import Skeleton , { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { getAllPlaces } from '../../common/api/getPlaces';
import { tokenActions } from '../../redux/reducers/tokenSlice';
import { tokenRefresh } from '../../common/api/login';
import { scrollActions } from '../../redux/reducers/scrollSlice';
import Footer from '../../common/components/Footer'
import RegionSelectionModal from './modal/RegionSelectionModal'
import Place from './place/Place'
// import {RootState} from '../../redux/store'
import { ReactComponent as BottomArrow } from '../../icons/bottom-arrow.svg';
import './WhereToGo.scss';
import Calender from '../../common/utils/Calender';


interface PlaceType {
  address: string
  checkin: string
  checkout: string
  isBooking: number
  lowestPrice: string
  mainPhotoUrl: string
  name: string
  placeId: number
  wishId: number
}

function AllPlacesSkeletons() {
  const AllPlacesSkeletonsArray = [];
  for (let i = 0; i < 20; i += 1) {
    AllPlacesSkeletonsArray.push(
      <div className="skeleton">
        <SkeletonTheme baseColor="#f0e9e9" highlightColor="#e4dddd">
        <Skeleton style={{height:"30vh"}} borderRadius={5} />
        <Skeleton height={60} borderRadius={5} />
        </SkeletonTheme>
      </div>,
    );
  }
  return AllPlacesSkeletonsArray;
}

function WhereToGo() {
  const [areaTerm, setAreaTerm] = useState('');
  const [regionSelectionModal, setRegionSelectionModal] = useState(false);
  const userId = useSelector((state: any) => state.persist.user.user.id);
  const accessToken = useSelector((state: any) => state.token.token);
  const refreshToken = localStorage.getItem('refreshToken') || '';
  const [isCalenderOpen, setIsCalenderOpen] = useState(false);
  const [selectedDateString, setSelectedDateString] = useState('');
  const [selectedDate, setSelectedDate] = useState({ start: '', end: '' });
  const { date, dateString } = useSelector((state: any) => state.date);
  const { whereToGoScrollY } = useSelector((state: any) => state.scroll);
  const sequence = dateString.length ? 2 : 0;
  const dispatch = useDispatch();
  const navigation = useNavigate();
  const location: any = useLocation();
  const allPlacesSkeletons = useMemo(()=>AllPlacesSkeletons(),[])
  const startDt =`${date.start.substring(0,4)}-${date.start.substring(4,6)}-${date.start.substring(6,10)}`
  const endDt = `${date.end.substring(0,4)}-${date.end.substring(4,6)}-${date.end.substring(6,10)}`

  const { isLoading, error, data: places, isFetching, refetch } = useQuery(
    'getAllPlaces',
    () => fetch(`http://49.50.161.156/place/selectWheretogo?userId=${userId}&startDt=${startDt}&endDt=${endDt}`).then((res) => res.json()),
    {
      cacheTime: 10000, // cacheTime : 언마운트된 후 어느 시점까지 메모리에 데이터를 저장하여 캐싱할 것인지를 결정함.
      staleTime: 10000, // staleTime : 마운트 되어 있는 시점에서 데이터가 구식인지 판단함.
      refetchInterval: false, // 데이터 변경시 fetch하는시간 // default:false : db 데이터값 변경하면 즉시 변경
      onSuccess: (data: any) => {
        console.log(startDt)
      },
      onError: (error: any) => {
        console.log(error)
      }
    },
  );
  useEffect(() => { refetch() }, [date])

  useEffect(() => {
    if (location.state?.prevPath.includes('/detail-place')) {
      dispatch(scrollActions.scroll({ whereToGo: window.scrollY }));
      window.scrollTo(0, whereToGoScrollY);
    } else {
      window.scrollTo(0, 0);
    }
  }, []);

  // useEffect(() => {
  //   tokenRefresh({ refreshToken }, (response: AxiosResponse) => {
  //     const { code } = response.data;

  //     if (code === 200) {
  //       const accessToken = response.headers.authorization_access;
  //       const refreshToken = response.headers.authorization_refresh;

  //       dispatch(tokenActions.setToken(accessToken));
  //       localStorage.setItem('refreshToken', refreshToken);
  //     } else {
  //       navigation('/user/signin');
  //     }
  //   }, dispatch);
  // }, [accessToken]);

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
      {isCalenderOpen && <Calender closeCalender={handleCalenderOpenClose} isRoom={false} />}
      <div className={classNames('where-to-go-background', { close: isCalenderOpen })}>
        {
          isLoading ? <div className="filter-skeleton">
            <SkeletonTheme baseColor="#f0e9e9" highlightColor="#e4dddd">
              <Skeleton height={49} borderRadius={5} />
            </SkeletonTheme>
          </div> : <div className="search-region-date">
            <div className="search-region" aria-hidden="true" onClick={handleRegionSelectionModal}>
              {areaTerm === '' ? '전체' : areaTerm}
              <BottomArrow className="bottom-arrow" />
            </div>
            <div className="search-date" aria-hidden="true" onClick={handleCalenderOpenClose}>
              {dateString}
              <BottomArrow className="bottom-arrow" />
            </div>
          </div>
        }
        <div className="places-container">
          {isLoading
            ? allPlacesSkeletons
            : places?.data?.map((place: PlaceType) => {
                if (place.address.includes(areaTerm)) {
                    return <Place key={place.placeId} place={place} />;
                }
              })}
        </div>
        <RegionSelectionModal
          regionSelectionModal={regionSelectionModal}
          closeRegionSelectionModal={closeRegionSelectionModal}
          setAreaTerm={setAreaTerm}
          areaTerm={areaTerm}
        />
      </div>
      <Footer />
    </>
  );
}

export default WhereToGo;