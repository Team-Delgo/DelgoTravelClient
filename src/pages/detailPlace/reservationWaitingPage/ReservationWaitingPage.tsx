import React,{useEffect,useState} from 'react';
import { useSelector,useDispatch } from "react-redux";
import { useLocation,Link,useParams,useNavigate} from 'react-router-dom';
import { AxiosResponse } from 'axios';
import {bookingRequest,bookingGetData} from '../../../common/api/booking'
import './ReservationWaitingPage.scss';

function ReservationWaitingPage() {
  const [reviews, setReviews] = useState<Array<any>>([]);
  const [bookingId,setBookingId] = useState("")
  const location: any = useLocation();
  const { placeId } = useParams();
  const {user} = useSelector((state: any) => state.persist.user);
  const { room, place,date } = useSelector((state: any) => state.persist.reservation);
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
      },
      (response: AxiosResponse) => {
        setBookingId(response.data.data.bookingId)
        console.log(response.data.data.bookingId)
        setTimeout(() => {
          navigate(`/reservation-confirm/${response.data.data.bookingId}`);
        }, 5000);
      },
      dispatch,
    )

  }, []);

  return (
    <div>12313123123</div>
  );
}

export default ReservationWaitingPage;