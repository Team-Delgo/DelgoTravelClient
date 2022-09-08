import React, { useState, useCallback,memo } from 'react'
import {  useLocation,useNavigate} from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { AxiosResponse } from 'axios';
import AlertConfirm from '../../../../common/dialog/AlertConfirm';
import { wishDelete } from '../../../../common/api/wish'
import { scrollActions } from '../../../../redux/slice/scrollSlice';
import {prevPathActions} from "../../../../redux/slice/prevPathSlice"
import {RootState} from '../../../../redux/store'
import { ReactComponent as ActiveHeart } from '../../../../common/icons/heart-active.svg';
import './WishedPlace.scss';

interface WishedPlaceTypeProps {
  place: PlaceType
  getWishedPlacesRefetch:() => void
  getRecommendedPlacesRefetch:() => void
}

interface PlaceType {
  address: string;
  lowestPrice: string;
  mainPhotoUrl: string;
  name: string;
  placeId: number;
  registDt: string;
  wishId: number;
}

function WishedPlace({ place, getWishedPlacesRefetch,getRecommendedPlacesRefetch}: WishedPlaceTypeProps) {
  const [wishListAlertConfirmOpen, setWishListAlertConfirmOpen] = useState(false);
  const accessToken = useSelector((state: RootState) => state.persist.token.token);
  const { OS } = useSelector((state: RootState) => state.persist.device);
  const dispatch = useDispatch();
  const location: any = useLocation();
  const navigate = useNavigate();

  const wishListDelete = useCallback(() => {
    wishListConfirmModalClose()
    wishDelete(
      { wishId: place.wishId, accessToken },
      (response: AxiosResponse) => {
        if (response.data.code === 200) {
          getRecommendedPlacesRefetch()
          setTimeout(() => {
            getWishedPlacesRefetch();
          }, 100);
        }
      },
      dispatch,
    );
    if (OS === 'android') {
      window.BRIDGE.vibrate()
    }
    else {
      window.webkit.messageHandlers.vibrate.postMessage('')
    }
  }, []);

  const wishListConfirmModalOpen =useCallback(() => {
    setWishListAlertConfirmOpen(true);
  },[])

  const wishListConfirmModalClose = useCallback(()=> {
    setWishListAlertConfirmOpen(false);
  },[])

  const moveToDetailPage = useCallback(() => {
    dispatch(scrollActions.scroll({ myStorage: window.scrollY}));
    dispatch(prevPathActions.prevPath({ prevPath: location.pathname }));
    navigate(`/detail-place/${place.placeId}`);
  }, []);

  return (
    <div className="wished-place" aria-hidden="true">
      <img src={place.mainPhotoUrl} alt="wished-place-img" aria-hidden="true" onClick={moveToDetailPage} />
      <div className="wished-place-name" aria-hidden="true" onClick={moveToDetailPage}>
        {place.name}
      </div>
      <div className="wished-place-location" aria-hidden="true" onClick={moveToDetailPage}>
        {place.address}
      </div>
      <div className="wished-place-heart">
        {wishListAlertConfirmOpen && (
          <AlertConfirm
            text="정말 찜 목록에서 제거하시겠어요?"
            buttonText='확인'
            yesButtonHandler={wishListDelete}
            noButtonHandler={wishListConfirmModalClose}
          />
        )}
          <ActiveHeart onClick={wishListConfirmModalOpen} />
      </div>
    </div>
  );
}

export default memo(WishedPlace)