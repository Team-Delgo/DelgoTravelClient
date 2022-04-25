import React,{useState,useCallback} from 'react'
import Heart from '../../common/components/Heart'
// import { ReactComponent as ActiveHeart } from '../../icons/heart-active.svg';
// import { ReactComponent as Heart } from '../../icons/heart.svg';
import './RecommendedPlaces.scss';

type RedcommendedPlacesProps = {
    place:RecommendedPlaceType
}

type RecommendedPlaceType = {
    image:string
    name: string
    location: string
  }

function RecommendedPlaces({ place }: RedcommendedPlacesProps) {
  const [wishList, setWishList] = useState(false);

  const handleWishList = useCallback(() => {
    setWishList(!wishList);
  },[wishList]);

  return (
    <div className="recommended-places">
      <img src={place.image} alt="recommended-place-img" />
      <div className="recommended-places-name">{place.name}</div>
      <div className="recommended-places-location">{place.location}</div>
      {/* {wishList ? (
        <ActiveHeart className="recommended-places-heart" onClick={handleWishList} />
      ) : (
        <Heart className="recommended-places-heart" onClick={handleWishList} />
      )} */}
      <div className="recommended-places-heart">
        <Heart wishList={wishList} handleWishList={handleWishList} />
      </div>
    </div>
  );
}

export default RecommendedPlaces;