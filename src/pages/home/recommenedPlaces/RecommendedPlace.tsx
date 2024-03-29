import React, { useState, useCallback, memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { AxiosResponse } from 'axios';
import { wishInsert, wishDelete } from '../../../common/api/wish';
import AlertConfirm from '../../../common/dialog/AlertConfirm';
import {
  SIGN_IN_PATH,
} from '../../../common/constants/path.const';
import './RecommendedPlace.scss';
import { scrollActions } from '../../../redux/slice/scrollSlice';
import { prevPathActions } from '../../../redux/slice/prevPathSlice';
import { RootState } from '../../../redux/store';
import { ReactComponent as ActiveHeart } from '../../../common/icons/heart-active.svg';
import { ReactComponent as Heart } from '../../../common/icons/heart.svg';
import { PlaceType } from '../../../common/types/place';

interface RedcommendedPlacesProps {
  place: PlaceType;
}
 
declare global {
  interface Window {
    BRIDGE: any;
    webkit: any;
    Kakao: any;
  }
}

function RecommendedPlace({ place }: RedcommendedPlacesProps) {
  const [wishList, setWishList] = useState(place.wishId);
  const [logInModalOpen, setLogInModalOpen] = useState(false);
  const [toastMessageOpen, setToastMessage] = useState(false);
  const userId = useSelector((state: RootState) => state.persist.user.user.id);
  const isSignIn = useSelector((state: RootState) => state.persist.user.isSignIn);
  const { OS } = useSelector((state: RootState) => state.persist.device);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location: any = useLocation();


  const wishListInsert = () => {
    if (isSignIn) {
      wishInsert({ userId, placeId: place.placeId }, dispatch, (response: AxiosResponse) => {
        if (response.data.code === 200) {
          setWishList(response.data.data.wishId);
        }
      });
      if (OS === 'android') {
        window.BRIDGE.vibrate();
      } else {
        window.webkit.messageHandlers.vibrate.postMessage('');
      }
    } else {
      setLogInModalOpen(true);
    }
  };

  const wishListDelete = () => {
    wishDelete({ wishId: wishList }, dispatch, (response: AxiosResponse) => {
      if (response.data.code === 200) {
        setWishList(0);
      }
    });
  };

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
        {wishList === 0 ? <Heart onClick={wishListInsert} /> : <ActiveHeart onClick={wishListDelete} />}
      </div>
      {logInModalOpen && (
        <AlertConfirm
          text="로그인 후 이용 할 수 있습니다."
          buttonText="로그인"
          noButtonHandler={() => {
            setLogInModalOpen(false);
          }}
          yesButtonHandler={() => {
            navigate(SIGN_IN_PATH.MAIN);
          }}
        />
      )}
    </div>
  );
}

export default memo(RecommendedPlace);
