import React,{useState} from 'react'
import Heart from '../../../../common/components/Heart'
// import { ReactComponent as ActiveHeart } from '../../../icons/heart-active.svg';
// import { ReactComponent as Heart } from '../../../icons/heart.svg';
import './WishedPlace.scss';

type SavedPlaceTypeProps = {
    place:SavedPlaceType
}

type SavedPlaceType = {
    image:string
    name: string
    location: string
  }


function WishedPlace({ place }: SavedPlaceTypeProps) {
  const [wishList, setWishList] = useState(true);

  const handleWishList = () => {
    setWishList(!wishList);
  };

  return (
    <div className="wished-place">
      <img src={place.image} alt="wished-place-img" />
      <div className="wished-place-name">{place.name}</div>
      <div className="wished-place-location">{place.location}</div>
      {/* {wishList ? (
        <ActiveHeart className="wished-place-heart" onClick={handleWishList} />
      ) : (
        <Heart className="wished-place-heart" onClick={handleWishList} />
      )} */}
      <div className="wished-place-heart">
        <Heart wishList={wishList} handleWishList={handleWishList} />
      </div>
    </div>
  );
}

export default WishedPlace;