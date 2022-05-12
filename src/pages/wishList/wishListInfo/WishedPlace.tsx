import React,{useState,useCallback} from 'react'
import { useSelector } from "react-redux";
import { AxiosResponse } from 'axios';
import Heart from '../../../common/components/Heart'
import {wishDelete} from '../../../common/api/wish'
import './WishedPlace.scss';

type WishedPlaceTypeProps = {
    place:PlaceType
    wishedPlace:Array<PlaceType>
    setWishedPlace:any
}

interface PlaceType {
  address: string;
  lowestPrice: string;
  mainPhotoUrl: string;
  name: string;
  placeId: number;
  registDt: string;
  wishId: number;
}


function WishedPlace({ place,wishedPlace,setWishedPlace }: WishedPlaceTypeProps) {
  const [wishList, setWishList] = useState(true);
  const refreshToken = localStorage.getItem('refreshToken') || '';
  const accessToken = useSelector((state: any) => state.token.token);

  const wishListDelete = useCallback(() => {
    wishDelete({ wishId: place.wishId,accessToken }, (response: AxiosResponse) => {
      if (response.data.code === 200) {
        const updateWishedPlaces = wishedPlace.filter(p => p.placeId !== place.placeId);
        setWishedPlace(updateWishedPlaces)
        setWishList(false);
      }
    });
  },[wishList,wishedPlace])

  return (
    <div className="wished-place">
      {wishList && (
        <>
          <img src={place.mainPhotoUrl} alt="wished-place-img" />
          <div className="wished-place-name">{place.name}</div>
          <div className="wished-place-location">{place.address}</div>
          <div className="wished-place-heart">
            <Heart wishList={wishList} handleWishList={wishListDelete} />
          </div>
        </>
      )}
    </div>
  );
}

export default WishedPlace;