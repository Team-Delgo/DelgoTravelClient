import React,{useState,useCallback} from 'react'
import { AxiosResponse } from 'axios';
import Heart from '../../../common/components/Heart'
import {wishDelete} from '../../../common/api/wish'
// import { ReactComponent as ActiveHeart } from '../../../icons/heart-active.svg';
// import { ReactComponent as Heart } from '../../../icons/heart.svg';
import './WishedPlace.scss';

type SavedPlaceTypeProps = {
    place:PlaceType
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


function WishedPlace({ place }: SavedPlaceTypeProps) {
  const [wishList, setWishList] = useState(true);


  const wishListDelete = useCallback(() => {
    setWishList(false);
    wishDelete({ wishId: place.wishId }, (response: AxiosResponse) => {
      if (response.data.code === 200) {
        setWishList(false);
      }
    });
  },[])

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