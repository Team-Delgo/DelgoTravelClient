import React,{useEffect} from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate} from 'react-router-dom';
import { AxiosResponse } from 'axios';
import Loading from "../../../common/utils/Loading"
import {bookingRequest} from '../../../common/api/booking'
import {RootState} from '../../../redux/store'
import './ReservationWaitingPage.scss';




function ReservationWaitingPage() {
  const { room, place,date,user,coupon } = useSelector((state: RootState) => state.persist.reservation);
  const navigate = useNavigate();
  const urlStr = window.location.href
  const url = new URL(urlStr);
  const urlParams = url.searchParams;
  const orderId = urlParams.get('orderId');
  const paymentKey = urlParams.get('paymentKey');
  const dispatch = useDispatch();

  useEffect(() => {
    window.scrollTo(0, 0);
    bookingRequest(
      {
        userId: user.id,
        placeId: place.placeId,
        roomId: room.roomId,
        couponId: coupon.couponId,
        reservedName: user.nickname,
        point: 0,
        startDt: date.date.start,
        endDt: date.date.end,
        orderId,
        paymentKey,
      },
      dispatch,
      (response: AxiosResponse) => {
        console.log(response.data.data);
        if (response.data.data !== null) {
          navigate(`/reservation-confirm/${response.data.data}`);
        }
      },
    );
  }, []);

  return (
    <Loading/>
  );
}

export default ReservationWaitingPage;