import React,{useState,useCallback} from 'react'
import { Link } from 'react-router-dom';
import { useSelector } from "react-redux";
import { AxiosResponse } from 'axios';
import alertConfirm, { Button, alert } from "react-alert-confirm";
import "react-alert-confirm/dist/index.css";
import AlertConfirm from '../../../common/dialog/AlertConfirm';
import Heart from '../../../common/components/Heart'
import {wishDelete} from '../../../common/api/wish'
import './WishedPlace.scss';

type WishedPlaceTypeProps = {
    place:PlaceType
    wishedPlace:Array<PlaceType>
    setWishedPlace:any
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
  const refreshToken = localStorage.getItem('refreshToken') || '';
  const accessToken = useSelector((state: any) => state.token.token);

  const wishListDelete = useCallback(() => {
    wishDelete({ wishId: place.wishId, accessToken }, (response: AxiosResponse) => {
      if (response.data.code === 200) {
        const updateWishedPlaces = wishedPlace.filter((p) => p.placeId !== place.placeId);
        setWishedPlace(updateWishedPlaces);
        setWishList(false);
      }
    });
  }, [wishList, wishedPlace]);

  const wishListDeleteConfirm = async () => {
    window.scrollTo(0, 0);
    const [isOk, action, instance] = await alertConfirm({
      content: <div style={{ textAlign: 'center' }}>정말 찜 목록에서 제거하시겠어요?</div>,
      // eslint-disable-next-line react/no-unstable-nested-components
      footer(dispatch) {
        return (
          <div style={{ margin: 'auto' }}>
            <Button
              style={{ marginRight: '40px', width: '80px', borderRadius: '25px' }}
              onClick={() => dispatch('delete')}
              styleType="default"
            >
              네
            </Button>
            <Button
              style={{ marginLeft: '40px', width: '80px', borderRadius: '25px' }}
              onClick={() => dispatch('cancel')}
              styleType="default"
            >
              아니요
            </Button>
          </div>
        );
      },
      async closeBefore(action, close) {
        if (action === 'delete') {
          wishListDelete();
          close();
        } else {
          close();
        }
      },
    });
    console.log(isOk, action, instance);
  };

  return (
    <div className="wished-place">
      {wishList && (
        <>
          <Link to={`/detail-place/${place.placeId}`} key={place.placeId}>
            <img src={place.mainPhotoUrl} alt="wished-place-img" aria-hidden="true" />
          </Link>
          <Link to={`/detail-place/${place.placeId}`} key={place.placeId}>
            <div className="wished-place-name">{place.name}</div>
          </Link>
          <Link to={`/detail-place/${place.placeId}`} key={place.placeId}>
            <div className="wished-place-location">{place.address}</div>
          </Link>
          <div className="wished-place-heart">
            <Heart wishList={wishList} handleWishList={wishListDeleteConfirm} />
          </div>
        </>
      )}
    </div>
  );
}

export default WishedPlace;