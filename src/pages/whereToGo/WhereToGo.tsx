import React,{useState} from 'react'
import Footer from '../../common/layouts/Footer'
import Place from './Place'
import { ReactComponent as BottomArrow } from '../../icons/bottom-arrow.svg';
import './WhereToGo.scss'

type PlaceType = {
  id: number
  image:string
  region: string
  region_detail: string
  name: string
  maximum_person : number
  maximum_dog : number
  price : number
}

function WhereToGo() {
  const [places, setPlaces] = useState<Array<PlaceType>>([
    {
      id:1,
      image: `${process.env.PUBLIC_URL}/assets/images/whereToGoImage.png`,
      region: '강원도',
      region_detail: '원주',
      name:'멍멍숙소멍',
      maximum_person : 4,
      maximum_dog : 2,
      price : 190000,
    },
    {
      id:2,
      image: `${process.env.PUBLIC_URL}/assets/images/whereToGoImage.png`,
      region: '강원도',
      region_detail: '원주',
      name:'멍멍숙소멍',
      maximum_person : 4,
      maximum_dog : 2,
      price : 190000,
    },
    {
      id:3,
      image: `${process.env.PUBLIC_URL}/assets/images/whereToGoImage.png`,
      region: '강원도',
      region_detail: '원주',
      name:'멍멍숙소멍',
      maximum_person : 4,
      maximum_dog : 2,
      price : 190000,
    }
  ]);
  return (
    <div className="where-to-go-background">
      <input className="search-place" placeholder="숙소검색" />
      <div className="search-region-date">
        <div className="search-region">
          전체
          <BottomArrow className="bottom-arrow"/>
        </div>
        <div className="search-date">
          22.03.01 - 22.03.22 / 1박
          <BottomArrow className="bottom-arrow"/>
        </div>
      </div>
      <div className="places-container">
        {places.map((place) => (
          <Place place={place} key={place.id} />
        ))}
        </div>
      <Footer />
    </div>
  );
}

export default WhereToGo;