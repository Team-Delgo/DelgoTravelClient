import React from 'react'
import './Place.scss'

type PlaceTypeProps = {
    place:PlaceType
}

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

function Place({ place }: PlaceTypeProps) {
  return (
    <div className="place">
      <img src={place.image} alt="place-img" />
      <div className="place-info">
        <div className="place-info-first-line">
          <span className="place-region">
            <span>{place.region}&nbsp;</span>
            <span>{place.region_detail}</span>
          </span>
          <span className="place-maximum">
            <span>최대 {place.maximum_person}명</span>
            <span>/{place.maximum_dog}마리</span>
          </span>
        </div>
        <div className="place-info-second-line">
          <span>{place.name}</span>
          <span>{place.price}원~</span>
        </div>
      </div>
    </div>
  );
}

export default Place