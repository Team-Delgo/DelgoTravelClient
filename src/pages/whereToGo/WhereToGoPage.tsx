/* eslint-disable no-nested-ternary */
/* eslint-disable array-callback-return */
import React, { useState, useEffect, useCallback, useMemo } from 'react'
import { useLocation, Link } from 'react-router-dom';
import { useSelector } from "react-redux";
import classNames from 'classnames';
import { useDispatch } from 'react-redux';
import { useQuery } from 'react-query'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { getAllPlaces } from '../../common/api/places';
import { useErrorHandlers } from '../../common/api/useErrorHandlers';
import Footer from '../../common/components/FooterNavigation'
import RegionSelectionModal from './modal/RegionSelectionModal'
import Place from './place/Place'
import { RootState } from '../../redux/store'
import { ReactComponent as BottomArrow } from '../../icons/bottom-arrow.svg';
import Delgo from '../../icons/delgo.svg';
import './WhereToGoPage.scss';
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
          <Skeleton style={{ height: "30vh" }} borderRadius={5} />
          <Skeleton height={60} borderRadius={5} />
        </SkeletonTheme>
      </div>,
    );
  }
  return AllPlacesSkeletonsArray;
}

const areaName = ['경기', '제주', '전라']


function WhereToGoPage() {
  const whereToGoAreaName = useSelector((state: RootState) => state.persist.area.whereToGo)
  const [areaTerm, setAreaTerm] = useState("");
  const [regionSelectionModal, setRegionSelectionModal] = useState(false);
  const userId = useSelector((state: RootState) => state.persist.user.user.id);
  const accessToken = useSelector((state: RootState) => state.token.token);
  const refreshToken = localStorage.getItem('refreshToken') || '';
  const [isCalenderOpen, setIsCalenderOpen] = useState(false);
  const { date, dateString } = useSelector((state: RootState) => state.date);
  const { whereToGoScrollY } = useSelector((state: RootState) => state.persist.scroll);
  const location: any = useLocation();
  const allPlacesSkeletons = useMemo(() => AllPlacesSkeletons(), [])
  const startDt = `${date.start.substring(0, 4)}-${date.start.substring(4, 6)}-${date.start.substring(6, 10)}`
  const endDt = `${date.end.substring(0, 4)}-${date.end.substring(4, 6)}-${date.end.substring(6, 10)}`
  const dispatch = useDispatch()

  const { isLoading, data: places, refetch } = useQuery(
    'getAllPlaces',
    () => getAllPlaces(userId, startDt, endDt),
    {
      cacheTime: 1000 * 60 * 5,
      staleTime: 1000 * 60 * 3,
      refetchInterval: false,
      onError: (error: any) => {
        useErrorHandlers(dispatch, error)
      }
    },
  );
  useEffect(() => {
    refetch();
  }, [date]);

  useEffect(() => {
    if (location.state?.prevPath.includes('/detail-place')) {
      window.scrollTo(0, whereToGoScrollY);
      setAreaTerm(whereToGoAreaName.toString());
    } else {
      window.scrollTo(0, 0);
    }
  }, []);

  const handleRegionSelectionModal = useCallback(() => {
    setRegionSelectionModal(!regionSelectionModal);
  }, [regionSelectionModal]);

  const closeRegionSelectionModal = useCallback(() => {
    setRegionSelectionModal(false);
  }, []);

  const handleCalenderOpenClose = useCallback(() => {
    setTimeout(() => {
      setIsCalenderOpen(!isCalenderOpen);
    }, 200);
  }, [isCalenderOpen]);

  return (
    <>
      {isCalenderOpen && <Calender closeCalender={handleCalenderOpenClose} isRoom={false} />}
      <div className={classNames('where-to-go-background', { close: isCalenderOpen })}>
        <Link to="/">
          <img src={Delgo} alt="delgo" className="delgo-logo" />
        </Link>
        {isLoading ? (
          <div className="filter-skeleton">
            <SkeletonTheme baseColor="#f0e9e9" highlightColor="#e4dddd">
              <Skeleton height={49} borderRadius={5} />
            </SkeletonTheme>
          </div>
        ) : (
          <>
            {areaTerm === '' ? null : areaName.includes(areaTerm) ? (
              <header className="region-name">{areaTerm}로 델고가요</header>
            ) : (
              <header className="region-name">{areaTerm}으로 델고가요</header>
            )}
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
          </>
        )}
        <div className="places-container">
          {isLoading
            ? allPlacesSkeletons
            : places.data.map((place: PlaceType) => {
              if (place.address.includes(areaTerm)) {
                return <Place key={place.placeId} place={place} areaTerm={areaTerm} />;
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

export default WhereToGoPage;