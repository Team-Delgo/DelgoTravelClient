import React, { useState, useCallback, memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { AxiosResponse } from 'axios';
import { wishInsert, wishDelete } from '../../../common/api/wish';
import './RecommendedPlaces.scss';
import { scrollActions } from '../../../redux/slice/scrollSlice';
import { prevPathActions } from '../../../redux/slice/prevPathSlice';
import { ReactComponent as ActiveHeart } from '../../../icons/heart-active.svg';
import { ReactComponent as Heart } from '../../../icons/heart.svg';

interface RedcommendedPlacesProps {
  place: PlaceType;
}

interface PlaceType {
  address: string;
  checkin: string;
  checkout: string;
  isBooking: number;
  lowestPrice: string;
  mainPhotoUrl: string;
  name: string;
  placeId: number;
  wishId: number;
}


function RecommendedPlaces({ place }: RedcommendedPlacesProps) {
  const [wishList, setWishList] = useState(place.wishId);
  const accessToken = useSelector((state: any) => state.token.token);
  const userId = useSelector((state: any) => state.persist.user.user.id);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location: any = useLocation();

  const wishListInsert = useCallback(() => {
    console.log(userId,place.placeId,accessToken)
    wishInsert(
      { userId, placeId: place.placeId , accessToken},
      (response: AxiosResponse) => {
        if (response.data.code === 200) {
          console.log(response.data)
          setWishList(response.data.data.wishId);
        }
      },
      dispatch,
    );
  }, [wishList]);

  const wishListDelete = useCallback(() => {
    wishDelete(
      { wishId: wishList, accessToken },
      (response: AxiosResponse) => {
        if (response.data.code === 200) {
          setWishList(0);
        }
      },
      dispatch,
    );
  }, [wishList]);

  const moveToDetailPage = useCallback(() => {
    dispatch(scrollActions.scroll({ whereToGo: 0, detailPlace: 0, myStorage: 0, home: window.scrollY }));
    dispatch(prevPathActions.prevPath({ prevPath: location.pathname }));
    navigate(`/detail-place/${place.placeId}`);
  }, []);

  return (
    <div className="recommended-places" aria-hidden="true">
      <img src={place.mainPhotoUrl} alt="recommended-place-img" aria-hidden="true" onClick={moveToDetailPage} />
      <div className="recommended-places-name" aria-hidden="true" onClick={moveToDetailPage}>
        {place.name}
      </div>
      <div className="recommended-places-location" aria-hidden="true" onClick={moveToDetailPage}>
        {place.address}
      </div>
      <div className="recommended-places-heart">
        {wishList === 0 ? (
          <Heart onClick={wishListInsert} />
        ) : (
          <ActiveHeart onClick={wishListDelete} />
        )}
      </div>
    </div>
  );
}

export default memo(RecommendedPlaces);
