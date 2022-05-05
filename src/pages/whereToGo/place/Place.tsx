import React,{useState,useCallback } from 'react'
import { AxiosResponse } from 'axios';
import {wishInsert,wishDelete} from '../../../common/api/wish'
import Heart from '../../../common/components/Heart'
import './Place.scss'

interface PlaceTypeProps{
    place:PlaceType
    userId:number
    getAllPlace:()=>void
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

function Place({ place, userId ,getAllPlace,places,setPlaces}: PlaceTypeProps) {
  const [wishList, setWishList] = useState(place.wishId);

  const wishListInsert = useCallback(() => {
    setWishList(1);

    // const updatedUsers = places.map(place => (place.placeId) ? {...place, wishId: 123} : place)
    // setPlaces(updatedUsers)

    console.log(userId,place.placeId);
    wishInsert({ userId, placeId: place.placeId }, (response: AxiosResponse) => {
      if (response.data.code === 200) {
        // getAllPlace()
        setWishList(1);
      }
    });
  },[])

  const wishListDelete = useCallback(() => {
    setWishList(0);
    wishDelete({ wishId: place.wishId }, (response: AxiosResponse) => {
      if (response.data.code === 200) {
        // getAllPlace()
        setWishList(0);
      }
    });
  },[])

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