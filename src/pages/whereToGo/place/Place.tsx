import React, { useState, useCallback, memo, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from 'react-router-dom';
import { AxiosResponse } from 'axios';
import { wishInsert, wishDelete } from '../../../common/api/wish'
// import Heart from '../../../common/components/Heart'
import AlertConfirm from '../../../common/dialog/AlertConfirm';
import { scrollActions } from '../../../redux/slice/scrollSlice';
import { areaActions } from '../../../redux/slice/areaSlice';
import { prevPathActions } from "../../../redux/slice/prevPathSlice"
import { ReactComponent as ActiveHeart } from '../../../icons/heart-active.svg';
import { ReactComponent as Heart } from '../../../icons/heart.svg';
import {
  SIGN_IN_PATH,
} from '../../../constants/path.const';
import './Place.scss'

interface PlaceTypeProps {
  place: PlaceType
  areaTerm:string
}

interface PlaceType {
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

function Place({ place,areaTerm }: PlaceTypeProps) {
  const [wishList, setWishList] = useState(place.wishId);
  const accessToken = useSelector((state: any) => state.token.token);
  const userId = useSelector((state: any) => state.persist.user.user.id)
  const dispatch = useDispatch();
  const location: any = useLocation();
  const navigate = useNavigate();
  const isSignIn = useSelector((state: any) => state.persist.user.isSignIn);
  const [logInModalOpen, setLogInModalOpen] = useState(false);

  const wishListInsert = useCallback(() => {
    if(isSignIn){
      wishInsert({ userId, placeId: place.placeId, accessToken }, (response: AxiosResponse) => {
        if (response.data.code === 200) {
          setWishList(response.data.data.wishId);
        }
      }, dispatch);
    }
    else{
      setLogInModalOpen(true);
    }
  }, [wishList,isSignIn]);

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


  const moveToDetailPage = () => {
    dispatch(scrollActions.scroll({ whereToGo: window.scrollY, detailPlace: 0, myStorage: 0, homeY: 0 }));
    dispatch(areaActions.setArea({ areaName: areaTerm }));
    dispatch(prevPathActions.prevPath({ prevPath: location.pathname }));
    navigate(`/detail-place/${place.placeId}`);
  };

  return (
    <div className="place" aria-hidden="true">
      <div aria-hidden onClick={moveToDetailPage}>
        <img src={place.mainPhotoUrl} alt="place-img" />
      </div>
      <div className="place-info">
        <div className="place-info-first-line">
          <span className="place-region">
            {place.address.split(' ')[0]}&nbsp;{place.address.split(' ')[1]}
          </span>
        </div>
        <div className="place-info-second-line">
          <span>{place.name}</span>
          {place.isBooking === 0 ? <span>{place.lowestPrice}~</span> : <span>예약마감</span>}
        </div>
      </div>
      <div className="place-heart">
        {wishList === 0 ? (
          <Heart onClick={wishListInsert} />
        ) : (
          <ActiveHeart onClick={wishListDelete} />
        )}
      </div>
      {logInModalOpen && <AlertConfirm
        text="로그인 후 이용 할 수 있습니다."
        buttonText='로그인'
        noButtonHandler={() => {
          setLogInModalOpen(false);
        }}
        yesButtonHandler={() => {
          navigate(SIGN_IN_PATH.MAIN);
        }}
      />}
    </div>
  );
}

export default memo(Place);