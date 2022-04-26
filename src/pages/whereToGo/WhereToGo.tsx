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
  const [areaTerm, setAreaTerm] = useState('');

  useEffect(() => {
    getAllPlaces((response: AxiosResponse) => {
      setPlaces(response.data.data);
    });
  }, []);
  const handleSerchTerm = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  }, []);
  const handleChangeAreaTerm = useCallback((e)=>{
    setAreaTerm(e.target.value)
},[])

  return (
    <div className="where-to-go-background">
      <input className="search-place" placeholder="숙소검색" value={searchTerm} onChange={handleSerchTerm} />
      <div className="search-region-date">
        <select className="search-region" value={areaTerm} onChange={handleChangeAreaTerm}>
          <option value="">전체</option>
          <option value="제주">제주</option>
          <option value="강원">강원</option>
          <option value="부산">부산</option>
          <option value="경기">경기</option>
          <option value="인천">인천</option>
          <option value="전라">전라</option>
          <option value="경상">경상</option>
          <option value="충청">충청</option>
          <option value="광주">광주</option>
          <option value="대전">대전</option>
          <option value="대구">대구</option>
          <option value="울산">울산</option>
        </select>
        {/* <div className="search-region">
          전체
          <BottomArrow className="bottom-arrow" />
        </div> */}
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
    </div>
  );
}

export default WhereToGo;