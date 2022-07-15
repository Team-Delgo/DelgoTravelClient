import React,{useState,useCallback} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { AxiosResponse } from 'axios';
import { ReactComponent as ActiveHeart } from '../../../../icons/heart-active.svg';
import { ReactComponent as Heart } from '../../../../icons/heart.svg';
import { wishInsert,wishDelete } from '../../../../common/api/wish'
import './PopularPlace.scss'

type PopularPlaceTypeProps = {
    place:PopularPlaceType
}

type PopularPlaceType = {
  address: string
  checkin: string
  checkout: string
  isBooking: number
  lowestPrice: string
  mainPhotoUrl: string
  name: string
  placeId: number
  wishId: number
  }


function PopularPlace({ place }: PopularPlaceTypeProps  ) {
  const [wishList, setWishList] = useState(place.wishId);
  const userId = useSelector((state: any) => state.persist.user.user.id);
  const accessToken = useSelector((state: any) => state.token.token);
  const dispatch = useDispatch();
  
  const wishListInsert = useCallback(() => {
    wishInsert(
      { userId, placeId: place.placeId, accessToken },
      (response: AxiosResponse) => {
        if (response.data.code === 200) {
          setWishList(response.data.data.wishId);
        }
      },
      dispatch,
    );
  }, [wishList]);

  const wishListDelete = () => {
    wishDelete(
      { wishId: wishList, accessToken },
      (response: AxiosResponse) => {
        if (response.data.code === 200) {
          setWishList(0);
        }
      },
      dispatch,
    );
  }

  return (
    <div className="popular-place">
      <img src={place.mainPhotoUrl} alt="popular-place-img" />
      <div className="popular-place-name">{place.name}</div>
      <div className="popular-place-location">{place.address}</div>
      {wishList ? (
        <ActiveHeart className="popular-place-heart" onClick={wishListDelete} />
      ) : (
        <Heart className="popular-place-heart" onClick={wishListInsert} />
      )}
    </div>
  );
}

export default PopularPlace;