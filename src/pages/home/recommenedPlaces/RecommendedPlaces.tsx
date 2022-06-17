import React, { useState, useCallback } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { AxiosResponse } from 'axios';
import { wishInsert, wishDelete } from '../../../common/api/wish'
import Heart from '../../../common/components/Heart'
// import { ReactComponent as ActiveHeart } from '../../../icons/heart-active.svg';
// import { ReactComponent as Heart } from '../../../icons/heart.svg';
import './RecommendedPlaces.scss';

interface RedcommendedPlacesProps {
  place: RecommendedPlaceType
  places: Array<RecommendedPlaceType>
  setPlaces: any
}

interface RecommendedPlaceType {
  address: string
  lowestPrice: string
  mainPhotoUrl: string
  name: string
  placeId: number
  registDt: string
  wishId: number
}


function RecommendedPlaces({ place, places, setPlaces }: RedcommendedPlacesProps) {
  const [wishList, setWishList] = useState(place.wishId);
  const accessToken = useSelector((state: any) => state.token.token);
  const userId = useSelector((state: any) => state.persist.user.user.id);
  const dispatch = useDispatch();

  const wishListInsert = useCallback(() => {
    wishInsert(
      { userId, placeId: place.placeId, accessToken },
      (response: AxiosResponse) => {
        if (response.data.code === 200) {
          const updatePlace = { ...place, wishId: response.data.data.wishId };
          const updatePlaces = places.map((p) => (p.placeId === updatePlace.placeId ? { ...p, ...updatePlace } : p));
          setPlaces(updatePlaces);
          setWishList(response.data.data.wishId);
        }
      },
      dispatch,
    );
  }, [wishList, places]);

  const wishListDelete = useCallback(() => {
    wishDelete(
      { wishId: wishList, accessToken },
      (response: AxiosResponse) => {
        if (response.data.code === 200) {
          const updatePlace = { ...place, wishId: 0 };
          const updatePlaces = places.map((p) => (p.placeId === updatePlace.placeId ? { ...p, ...updatePlace } : p));
          setPlaces(updatePlaces);
          setWishList(0);
        }
      },
      dispatch,
    );
  }, [wishList, places]);

  return (
    <div className="recommended-places">
      <img src={place.mainPhotoUrl} alt="recommended-place-img" />
      <div className="recommended-places-name">{place.name}</div>
      <div className="recommended-places-location">{place.address}</div>
      <div className="recommended-places-heart">
        {wishList === 0 ? (
          <Heart wishList={wishList} handleWishList={wishListInsert} />
        ) : (
          <Heart wishList={wishList} handleWishList={wishListDelete} />
        )}
      </div>
    </div>
  );
}

export default RecommendedPlaces;