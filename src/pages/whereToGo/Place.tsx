import React,{useState,useCallback} from 'react'
import { ReactComponent as ActiveHeart } from '../../icons/heart-active.svg';
import { ReactComponent as Heart } from '../../icons/heart.svg';
import './Place.scss'

type PlaceTypeProps = {
    place:PlaceType
}

type PlaceType = {
  address: string
  lowestPrice: string
  mainPhotoUrl: string
  name: string
  placeId: number
  registDt: string
}

function Place({ place }: PlaceTypeProps) {
  const [wishList, setWishList] = useState(false);

  const handleWishList =useCallback(() => {
    setWishList(!wishList);
  },[wishList]);

  return (
    <div className="place">
      <img src={place.mainPhotoUrl} alt="place-img" />
      <div className="place-info">
        <div className="place-info-first-line">
          <span className="place-region">
            <span>{place.address}&nbsp;</span>
          </span>
        </div>
        <div className="place-info-second-line">
          <span>{place.name}</span>
          <span>{place.lowestPrice}원~</span>
        </div>
      </div>
      {wishList ? (
        <ActiveHeart className="place-heart" onClick={handleWishList} />
      ) : (
        <Heart className="place-heart" onClick={handleWishList} />
      )}
    </div>
  );
}

export default Place