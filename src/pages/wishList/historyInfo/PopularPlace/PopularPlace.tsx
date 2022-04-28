import React,{useState} from 'react'
import { ReactComponent as ActiveHeart } from '../../../../icons/heart-active.svg';
import { ReactComponent as Heart } from '../../../../icons/heart.svg';
import './PopularPlace.scss'

type PopularPlaceTypeProps = {
    place:PopularPlaceType
}

type PopularPlaceType = {
    image:string
    name: string
    location: string
  }


function PopularPlace({ place }: PopularPlaceTypeProps  ) {
  const [wishList, setWishList] = useState(true);

  const handleWishList = () => {
    setWishList(!wishList);
  };

  return (
    <div className="popular-place">
      <img src={place.image} alt="popular-place-img" />
      <div className="popular-place-name">{place.name}</div>
      <div className="popular-place-location">{place.location}</div>
      {wishList ? (
        <ActiveHeart className="popular-place-heart" onClick={handleWishList} />
      ) : (
        <Heart className="popular-place-heart" onClick={handleWishList} />
      )}
    </div>
  );
}

export default PopularPlace;