import React,{useState} from 'react'
import { ReactComponent as ActiveHeart } from '../../icons/activeheart.svg';
import { ReactComponent as Heart } from '../../icons/heart.svg';
import './SavedPlace.scss';

type SavedPlaceTypeProps = {
    place:SavedPlaceType
}

type SavedPlaceType = {
    image:string
    name: string
    location: string
  }


function SavedPlace({ place }: SavedPlaceTypeProps) {
  const [wishList, setWishList] = useState(true);

  const handleWishList = () => {
    setWishList(!wishList);
  };

  return (
    <div className="saved-places">
      <img src={place.image} alt="recommended-place-img" />
      <div className="saved-places-name">{place.name}</div>
      <div className="saved-places-location">{place.location}</div>
      {wishList ? (
        <ActiveHeart className="saved-places-heart" onClick={handleWishList} />
      ) : (
        <Heart className="saved-places-heart" onClick={handleWishList} />
      )}
    </div>
  );
}

export default SavedPlace;