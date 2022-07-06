import React, { useState, useCallback,memo, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { useLocation,useNavigate } from 'react-router-dom';
import { AxiosResponse } from 'axios';
import { wishInsert, wishDelete } from '../../../common/api/wish'
import Heart from '../../../common/components/Heart'
import { scrollActions } from '../../../redux/reducers/scrollSlice';
import './Place.scss'

interface PlaceTypeProps {
  place: PlaceType
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

function Place({ place }: PlaceTypeProps) {
  const [wishList, setWishList] = useState(place.wishId);
  const accessToken = useSelector((state: any) => state.token.token);
  const userId = useSelector((state: any) => state.persist.user.user.id)
  const dispatch = useDispatch();
  const location: any = useLocation();
  const navigate = useNavigate();

  const wishListInsert = useCallback(() => {
    wishInsert({ userId, placeId: place.placeId, accessToken }, (response: AxiosResponse) => {
      if (response.data.code === 200) {
        // const updatePlace = { ...place, wishId: response.data.data.wishId };
        // const updatePlaces = places.map((p) => (p.placeId === updatePlace.placeId ? { ...p, ...updatePlace } : p));
        // setPlaces(updatePlaces);
        setWishList(response.data.data.wishId);
      }
    }, dispatch);
  }, [wishList]);

  const wishListDelete = useCallback(() => {
    wishDelete(
      { wishId: wishList, accessToken },
      (response: AxiosResponse) => {
        if (response.data.code === 200) {
          // const updatePlace = { ...place, wishId: 0 };
          // const updatePlaces = places.map((p) => (p.placeId === updatePlace.placeId ? { ...p, ...updatePlace } : p));
          // setPlaces(updatePlaces);
          setWishList(0);
        }
      },
      dispatch,
    );
  }, [wishList]);


  const moveToDetailPage = useCallback(() => {
    dispatch(scrollActions.scroll({ whereToGo: window.scrollY,detailPlace:0 }));
    navigate(`/detail-place/${place.placeId}`, {
      state: {
        prevPath: location.pathname,
      },
    });
  }, []);

  return (
    <div className="place" aria-hidden="true">
      <div aria-hidden onClick={place.isBooking===0 ? moveToDetailPage : undefined}>
        <img src={place.mainPhotoUrl} alt="place-img"/>
        </div>
      <div className="place-info">
        <div className="place-info-first-line">
          <span className="place-region">
            {place.address.split(' ')[0]}&nbsp;{place.address.split(' ')[1]}
          </span>
        </div>
        <div className="place-info-second-line">
          <span>{place.name}</span>
          {
            place.isBooking===0 ? <span>{place.lowestPrice}~</span>
            : <span>예약마감</span>
          }
        </div>
      </div>
      <div className="place-heart">
        {wishList === 0 ? (
          <Heart wishList={wishList} handleWishList={wishListInsert} />
        ) : (
          <Heart wishList={wishList} handleWishList={wishListDelete} />
        )}
      </div>
    </div>
  );
}

export default memo(Place);