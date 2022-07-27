import React,{useState,useCallback , memo} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation , useNavigate} from 'react-router-dom';
import { AxiosResponse } from 'axios';
import { ReactComponent as ActiveHeart } from '../../../../icons/heart-active.svg';
import { ReactComponent as Heart } from '../../../../icons/heart.svg';
import { wishInsert,wishDelete } from '../../../../common/api/wish'
import { scrollActions } from '../../../../redux/slice/scrollSlice';
import {prevPathActions} from "../../../../redux/slice/prevPathSlice"
import './PopularPlace.scss'

type PopularPlaceTypeProps = {
    place:PopularPlaceType
    getRecommendedPlacesRefetch:any
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


function PopularPlace({ place,getRecommendedPlacesRefetch }: PopularPlaceTypeProps  ) {
  const [wishList, setWishList] = useState(place.wishId);
  const userId = useSelector((state: any) => state.persist.user.user.id);
  const accessToken = useSelector((state: any) => state.token.token);
  const dispatch = useDispatch();
  const location: any = useLocation();
  const navigate = useNavigate();
  
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
          getRecommendedPlacesRefetch()
        }
      },
      dispatch,
    );
  }

  const moveToDetailPage = useCallback(() => {
    dispatch(scrollActions.scroll({ whereToGo: 0, detailPlace: 0, myStorage: window.scrollY, homeY: 0 }));
    dispatch(prevPathActions.prevPath({ prevPath: location.pathname }));
    navigate(`/detail-place/${place.placeId}`);
  }, []);

  return (
    <div className="popular-place">
      <img src={place.mainPhotoUrl} alt="popular-place-img" aria-hidden="true" onClick={moveToDetailPage}/>
      <div className="popular-place-name" aria-hidden="true" onClick={moveToDetailPage}>{place.name}</div>
      <div className="popular-place-location" aria-hidden="true" onClick={moveToDetailPage}>{place.address}</div>
      {wishList ? (
        <ActiveHeart className="popular-place-heart" onClick={wishListDelete} />
      ) : (
        <Heart className="popular-place-heart" onClick={wishListInsert} />
      )}
    </div>
  );
}

export default memo(PopularPlace);