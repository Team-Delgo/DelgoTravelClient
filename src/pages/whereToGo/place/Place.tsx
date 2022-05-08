import React,{useState,useCallback } from 'react'
import { AxiosResponse } from 'axios';
import {wishInsert,wishDelete} from '../../../common/api/wish'
import Heart from '../../../common/components/Heart'
import './Place.scss'

interface PlaceTypeProps{
    place:PlaceType
    userId:number
    places:Array<PlaceType>
    setPlaces:any
}

interface PlaceType  {
  address: string
  lowestPrice: string
  mainPhotoUrl: string
  name: string
  placeId: number
  registDt: string
  wishId: number
}

function Place({ place, userId ,places,setPlaces}: PlaceTypeProps) {
  const [wishList, setWishList] = useState(place.wishId);

  const wishListInsert = useCallback(() => {
    wishInsert({ userId, placeId: place.placeId }, (response: AxiosResponse) => {
      if (response.data.code === 200) {
        const updatePlace = {...place,wishId:response.data.data.wishId}
        const updatePlaces = places.map((p)=>
          p.placeId === updatePlace.placeId ? {...p , ...updatePlace} : p,
        )
        setPlaces(updatePlaces)
        setWishList(response.data.data.wishId);
      }
    });   
  },[wishList,places])

  const wishListDelete = useCallback(() => {
    wishDelete({ wishId: wishList }, (response: AxiosResponse) => {
      if (response.data.code === 200) {
        const updatePlace = {...place,wishId:0}
        const updatePlaces = places.map((p)=>
          p.placeId === updatePlace.placeId ? {...p , ...updatePlace} : p,
        )
        setPlaces(updatePlaces)
        setWishList(0);
      }
    });
  },[wishList,places])

  return (
    <div className="place">
      <img src={place.mainPhotoUrl} alt="place-img" />
      <div className="place-info">
        <div className="place-info-first-line">
          <span className="place-region">
            <span>
              {place.address.split(' ')[0]}&nbsp;{place.address.split(' ')[1]}
            </span>
          </span>
        </div>
        <div className="place-info-second-line">
          <span>{place.name}</span>
          <span>{place.lowestPrice}원~</span>
        </div>
      </div>
      <div className="place-heart">
        {wishList === 0 ? (
          <Heart wishList={wishList} handleWishList={wishListInsert} />
        ) : (
          <Heart wishList={wishList} handleWishList={wishListDelete} />
        )}
      </div>
    </div>
  );
}

export default Place;