import React,{useState,useCallback } from 'react'
import { useSelector } from "react-redux";
import { Link } from 'react-router-dom';
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

function Place({ place, userId, places, setPlaces }: PlaceTypeProps) {
  const [wishList, setWishList] = useState(place.wishId);
  const accessToken = useSelector((state: any) => state.token.token);

  const wishListInsert = useCallback(() => {
    wishInsert({ userId, placeId: place.placeId,accessToken}, (response: AxiosResponse) => {
      if (response.data.code === 200) {
        const updatePlace = { ...place, wishId: response.data.data.wishId };
        const updatePlaces = places.map((p) => (p.placeId === updatePlace.placeId ? { ...p, ...updatePlace } : p));
        setPlaces(updatePlaces);
        setWishList(response.data.data.wishId);
      }
    });
  }, [wishList, places]);

  const wishListDelete = useCallback(() => {
    wishDelete({ wishId: wishList,accessToken }, (response: AxiosResponse) => {
      if (response.data.code === 200) {
        const updatePlace = { ...place, wishId: 0 };
        const updatePlaces = places.map((p) => (p.placeId === updatePlace.placeId ? { ...p, ...updatePlace } : p));
        setPlaces(updatePlaces);
        setWishList(0);
      }
    });
  }, [wishList, places]);

  return (
    <div className="place" aria-hidden="true">
      <Link to={`/detail-place/${place.placeId}`} key={place.placeId}>
        <img src={place.mainPhotoUrl} alt="place-img" />
      </Link>
      <div className="place-info">
        <div className="place-info-first-line">
          <span className="place-region">
            {place.address.split(' ')[0]}&nbsp;{place.address.split(' ')[1]}
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