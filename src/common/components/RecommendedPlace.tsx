import React,{useState,useCallback , memo} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation , useNavigate} from 'react-router-dom';
import { AxiosResponse } from 'axios';
import { ReactComponent as ActiveHeart } from '../../icons/heart-active.svg';
import { ReactComponent as Heart } from '../../icons/heart.svg';
import { wishInsert,wishDelete } from '../api/wish'
import { scrollActions } from '../../redux/slice/scrollSlice';
import {prevPathActions} from "../../redux/slice/prevPathSlice"
import {RootState} from '../../redux/store'
import './RecommendedPlace.scss'

type RecommendedPlaceProps = {
    place:RecommendedPlaceType
    getRecommendedPlacesRefetch:() => void
    currentTab:number
}

type RecommendedPlaceType = {
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

  declare global{
    interface Window{
      BRIDGE:any
    }
  }

function RecommendedPlace({ place,getRecommendedPlacesRefetch,currentTab }: RecommendedPlaceProps  ) {
  const [wishList, setWishList] = useState(place.wishId);
  const userId = useSelector((state: RootState) => state.persist.user.user.id);
  const accessToken = useSelector((state: RootState) => state.token.token);
  const dispatch = useDispatch();
  const location: any = useLocation();
  const navigate = useNavigate();
  
  const wishListInsert = useCallback(() => {
    window.BRIDGE.vibrate() 
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

  const wishListDelete = useCallback(() => {
    window.BRIDGE.vibrate() 
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
  }, [wishList]);

  const moveToDetailPage = () => {
    dispatch(scrollActions.scroll({ whereToGo: 0, detailPlace: 0, myStorage: window.scrollY, homeY: 0 }));
    dispatch(prevPathActions.prevPath({ prevPath: location.pathname }));
    navigate(`/detail-place/${place.placeId}`, { state: currentTab })
  }

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

export default memo(RecommendedPlace);