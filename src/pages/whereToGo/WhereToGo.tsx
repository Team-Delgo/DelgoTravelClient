/* eslint-disable array-callback-return */
import React,{useState,useEffect,useCallback} from 'react'
import { AxiosResponse } from 'axios';
import getAllPlaces from '../../common/api/getAllPlaces';
import Footer from '../../common/layouts/Footer'
import Place from './Place'
import { ReactComponent as BottomArrow } from '../../icons/bottom-arrow.svg';
import './WhereToGo.scss';

type PlaceType = {
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

  useEffect(() => {
    getAllPlaces((response: AxiosResponse) => {
      setPlaces(response.data.data);
    });
  }, []);

  const handleSerchTerm = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  }, []);

  return (
    <div className="where-to-go-background">
      <input className="search-place" placeholder="숙소검색" value={searchTerm} onChange={handleSerchTerm} />
      <div className="search-region-date">
        <div className="search-region">
          전체
          <BottomArrow className="bottom-arrow" />
        </div>
        <div className="search-date">
          22.03.01 - 22.03.22 / 1박
          <BottomArrow className="bottom-arrow" />
        </div>
      </div>
      <div className="places-container">
        {places.map((place) => {
          if (place.name.includes(searchTerm)) {
            return <Place key={place.placeId} place={place}/>;
          }
        })}
      </div>
      <Footer />
    </div>
  );
}

export default WhereToGo;