import React, { useState, useCallback,memo } from 'react'
import { Link ,useLocation,useNavigate} from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { useMutation } from 'react-query'
import { AxiosResponse } from 'axios';
import AlertConfirm from '../../../../common/dialog/AlertConfirm';
import Heart from '../../../../common/components/Heart'
import { wishDelete } from '../../../../common/api/wish'
import { scrollActions } from '../../../../redux/slice/scrollSlice';
import {prevPathActions} from "../../../../redux/slice/prevPathSlice"
import './WishedPlace.scss';

interface WishedPlaceTypeProps {
  place: PlaceType
  refetch:any
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

function WishedPlace({ place, refetch }: WishedPlaceTypeProps) {
  const [wishList, setWishList] = useState(true);
  const accessToken = useSelector((state: any) => state.token.token);
  const [wishListAlertConfirmOpen, setWishListAlertConfirmOpen] = useState(false);
  const dispatch = useDispatch();
  const location: any = useLocation();
  const navigate = useNavigate();

  const wishListDelete = useCallback(() => {
    wishDelete(
      { wishId: place.wishId, accessToken },
      (response: AxiosResponse) => {
        if (response.data.code === 200) {
          // const updateWishedPlaces = wishedPlace.filter((p) => p.placeId !== place.placeId);
          // setWishedPlace(updateWishedPlaces);
          refetch();
        }
      },
      dispatch,
    );
  }, []);

  const wishListConfirmModalOpenClose = useCallback(() => {
    setWishListAlertConfirmOpen(!wishListAlertConfirmOpen);
  }, [wishListAlertConfirmOpen]);

  const moveToDetailPage = useCallback(() => {
    dispatch(scrollActions.scroll({ whereToGo: 0, detailPlace: 0, myStorage: window.scrollY, homeY: 0 }));
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
            yesButtonHandler={wishListDelete}
            noButtonHandler={wishListConfirmModalOpenClose}
          />
        )}
        <Heart wishList={wishList} handleWishList={wishListConfirmModalOpenClose} />
      </div>
    </div>
  );
}

export default memo(WishedPlace)