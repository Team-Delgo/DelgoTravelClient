import React,{useEffect} from 'react';
import { useSelector,useDispatch } from "react-redux";
import { useNavigate} from 'react-router-dom';
import { AxiosResponse } from 'axios';
import LoadingSpin from "react-loading-spin";
import {bookingRequest} from '../../../common/api/booking'
import './ReservationWaitingPage.scss';




function ReservationWaitingPage() {
  const {user} = useSelector((state: any) => state.persist.user);
  const { room, place,date } = useSelector((state: any) => state.persist.reservation);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const urlStr = window.location.href
  const url = new URL(urlStr);
  const urlParams = url.searchParams;
  const orderId = urlParams.get('orderId');
  const paymentKey = urlParams.get('paymentKey');


  useEffect(() => {
    window.scrollTo(0, 0);
    bookingRequest(
      {
        userId: user.id,
        placeId: place.placeId,
        roomId: room.roomId,
        couponId: 0,
        point: 0,
        peopleNum: 1,
        petNum: 1,
        startDt: date.date.start,
        endDt: date.date.end,
        // orderId,
        // paymentKey,
      },
      (response: AxiosResponse) => {
        console.log(response.data.data)
        // setTimeout(() => {
        //   navigate(`/reservation-confirm/${response.data.data}`);
        // }, 1000);
      },
      dispatch,
    )

  }, []);

  return (
    <div className="loading-spinner">
      <LoadingSpin primaryColor="#6E614D" secondaryColor="gray"/>
    </div>
  );
}

export default ReservationWaitingPage;