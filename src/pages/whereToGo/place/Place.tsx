import React, { useState, useCallback,memo, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { Link,useLocation,useNavigate } from 'react-router-dom';
import { AxiosResponse } from 'axios';
import { wishInsert, wishDelete } from '../../../common/api/wish'
import Heart from '../../../common/components/Heart'
import { scrollActions } from '../../../redux/reducers/scrollSlice';
import './Place.scss'

interface PlaceTypeProps {
  place: PlaceType
  places: Array<PlaceType>
  setPlaces: any
}

interface PlaceType {
  address: string
  lowestPrice: string
  mainPhotoUrl: string
  name: string
  placeId: number
  registDt: string
  wishId: number
}

function Place({ place, places, setPlaces }: PlaceTypeProps) {
  const [wishList, setWishList] = useState(place.wishId);
  const accessToken = useSelector((state: any) => state.token.token);
  const userId = useSelector((state: any) => state.persist.user.user.id)
  const dispatch = useDispatch();
  const location: any = useLocation();
  const navigate = useNavigate();

  const wishListInsert = useCallback(() => {
    wishInsert({ userId, placeId: place.placeId, accessToken }, (response: AxiosResponse) => {
      if (response.data.code === 200) {
        const updatePlace = { ...place, wishId: response.data.data.wishId };
        const updatePlaces = places.map((p) => (p.placeId === updatePlace.placeId ? { ...p, ...updatePlace } : p));
        setPlaces(updatePlaces);
        setWishList(response.data.data.wishId);
      }
    }, dispatch);
  }, [wishList, places]);

  const wishListDelete = useCallback(() => {
    wishDelete(
      { wishId: wishList, accessToken },
      (response: AxiosResponse) => {
        if (response.data.code === 200) {
          const updatePlace = { ...place, wishId: 0 };
          const updatePlaces = places.map((p) => (p.placeId === updatePlace.placeId ? { ...p, ...updatePlace } : p));
          setPlaces(updatePlaces);
          setWishList(0);
        }
      },
      dispatch,
    );
  }, [wishList, places]);

  useEffect(() => {
    return () => {
      console.log(window.scrollY)
    };
  }, []);


  const moveToDetailPage = useCallback(() => {
    dispatch(scrollActions.whereToGoScrollY({ scrollY: window.scrollY }));
    navigate(`/detail-place/${place.placeId}`, {
      state: {
        prevPath: location.pathname,
      },
    });
  }, []);

  return (
    <div className="place" aria-hidden="true">
      {/* <Link to={`/detail-place/${place.placeId}`} state={{ prevPath: location.pathname}}  key={place.placeId}> */}
      <div aria-hidden onClick={moveToDetailPage}>
        <img src={place.mainPhotoUrl} alt="place-img"/>
        </div>
      {/* </Link> */}
      <div className="place-info">
        <div className="place-info-first-line">
          <span className="place-region">
            {place.address.split(' ')[0]}&nbsp;{place.address.split(' ')[1]}
          </span>
        </div>
        <div className="place-info-second-line">
          <span>{place.name}</span>
          <span>{place.lowestPrice}~</span>
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