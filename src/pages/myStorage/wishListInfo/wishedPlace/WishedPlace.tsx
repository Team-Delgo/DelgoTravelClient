import React, { useState } from 'react'
import {  useLocation,useNavigate} from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { AxiosResponse } from 'axios';
import AlertConfirm from '../../../../common/dialog/AlertConfirm';
import { wishDelete } from '../../../../common/api/wish'
import { scrollActions } from '../../../../redux/slice/scrollSlice';
import {prevPathActions} from "../../../../redux/slice/prevPathSlice"
import {RootState} from '../../../../redux/store'
import { ReactComponent as ActiveHeart } from '../../../../common/icons/heart-active.svg';
import { WishedPlaceType,PlaceType } from '../../../../common/types/place';
import './WishedPlace.scss';

interface WishedPlaceTypeProps {
  place: WishedPlaceType
  getWishedPlacesRefetch:() => void
  getRecommendedPlacesRefetch:() => void
}

function WishedPlace({ place, getWishedPlacesRefetch,getRecommendedPlacesRefetch}: WishedPlaceTypeProps) {
  const [wishListAlertConfirmOpen, setWishListAlertConfirmOpen] = useState(false);
  const  OS  = useSelector((state: RootState) => state.persist.device.OS);
  const dispatch = useDispatch();
  const location: any = useLocation();
  const navigate = useNavigate();

  const wishListDelete = () => {
    wishListConfirmModalClose();
    wishDelete(
      { wishId: place.wishId },
      dispatch,
      (response: AxiosResponse) => {
        if (response.data.code === 200) {
          getRecommendedPlacesRefetch()
          setTimeout(() => {
            getWishedPlacesRefetch();
          }, 100);
        }
      },
    )
  };

  const wishListConfirmModalOpen = () => {
    setWishListAlertConfirmOpen(true);
  };

  const wishListConfirmModalClose = () => {
    setWishListAlertConfirmOpen(false);
  };

  const moveToDetailPage = () => {
    dispatch(scrollActions.myStorageScroll({ myStorage: window.scrollY }));
    dispatch(prevPathActions.prevPath({ prevPath: location.pathname }));
    navigate(`/detail-place/${place.placeId}`);
  }

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
            buttonText="확인"
            yesButtonHandler={wishListDelete}
            noButtonHandler={wishListConfirmModalClose}
          />
        )}
        <ActiveHeart onClick={wishListConfirmModalOpen} />
      </div>
    </div>
  );
}

export default WishedPlace