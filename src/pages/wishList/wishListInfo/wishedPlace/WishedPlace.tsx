import React, { useState, useCallback,memo } from 'react'
import { Link ,useLocation} from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { AxiosResponse } from 'axios';
import AlertConfirm from '../../../../common/dialog/AlertConfirm';
import Heart from '../../../../common/components/Heart'
import { wishDelete } from '../../../../common/api/wish'
import './WishedPlace.scss';

type WishedPlaceTypeProps = {
  place: PlaceType
  wishedPlace: Array<PlaceType>
  setWishedPlace: any
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


function WishedPlace({ place, wishedPlace, setWishedPlace }: WishedPlaceTypeProps) {
  const [wishList, setWishList] = useState(true);
  const accessToken = useSelector((state: any) => state.token.token);
  const [wishListAlertConfirmOpen, setWishListAlertConfirmOpen] = useState(false);
  const dispatch = useDispatch();
  const location: any = useLocation();

  const wishListDelete = useCallback(() => {
    wishDelete(
      { wishId: place.wishId, accessToken },
      (response: AxiosResponse) => {
        if (response.data.code === 200) {
          const updateWishedPlaces = wishedPlace.filter((p) => p.placeId !== place.placeId);
          setWishedPlace(updateWishedPlaces);
          setWishList(false);
        }
      },
      dispatch,
    );
  }, [wishList, wishedPlace]);

  const wishListConfirmModalOpenClose = useCallback(() => {
    setWishListAlertConfirmOpen(!wishListAlertConfirmOpen);
  }, [wishListAlertConfirmOpen]);


  return (
    <div className="wished-place">
      {wishList && (
        <>
          <Link to={`/detail-place/${place.placeId}`} state={{ prevPath: location.pathname }} key={place.placeId}>
            <img src={place.mainPhotoUrl} alt="wished-place-img" aria-hidden="true" />
          </Link>
          <Link to={`/detail-place/${place.placeId}`} key={place.placeId}>
            <div className="wished-place-name">{place.name}</div>
          </Link>
          <Link to={`/detail-place/${place.placeId}`} key={place.placeId}>
            <div className="wished-place-location">{place.address}</div>
          </Link>
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
        </>
      )}
    </div>
  );
}

export default memo(WishedPlace);