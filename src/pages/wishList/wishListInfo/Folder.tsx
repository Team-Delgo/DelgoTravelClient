import React,{useState} from 'react'
import WishedPlace from './WishedPlace';
import './Folder.scss';

type WishedPlaceType = {
    id: number
    image:string
    name: string
    location: string
  }

function Folder() {
    const [wishedPlace, setWishedPlace] = useState<Array<WishedPlaceType>>([
        {
          id: 1,
          image: `${process.env.PUBLIC_URL}/assets/images/recommendedPlaceImage.png`,
          name: '멍멍이네 하우스',
          location: '강원도 속초시 조앙동',
        },
        {
          id: 2,
          image: `${process.env.PUBLIC_URL}/assets/images/recommendedPlaceImage.png`,
          name: '멍멍이네 하우스',
          location: '강원도 속초시 조앙동',
        },
        {
          id: 3,
          image: `${process.env.PUBLIC_URL}/assets/images/recommendedPlaceImage.png`,
          name: '멍멍이네 하우스',
          location: '강원도 속초시 조앙동',
        },
      ]);

  return (
    <div className="wish-list-container">
    <div className="wish-list-container-header-text">저장 된 {wishedPlace.length}개의 숙소</div>
    {wishedPlace.map((place) => (
      <WishedPlace place={place} key={place.id} />
    ))}
  </div>
  )
}

export default Folder