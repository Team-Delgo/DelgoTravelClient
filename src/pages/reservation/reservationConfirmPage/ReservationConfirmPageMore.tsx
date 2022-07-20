import React,{useCallback,useEffect, useState} from "react";
import { useSelector,useDispatch } from "react-redux";
import { useNavigate,useParams,useLocation} from 'react-router-dom';
import { AxiosResponse } from 'axios';
import { ReactComponent as Exit } from '../../../icons/exit.svg';
import RightArrow from "../../../icons/right-arrow.svg";
import RightArrowBlack from "../../../icons/right-arrow-black.svg";
import BottomButton from "../../../common/components/BottomButton";
import { reservationActions } from '../../../redux/slice/reservationSlice';
import {bookingGetData} from '../../../common/api/booking'
import Map from '../../../common/utils/Map';
import ReservationCancleModal from "./modal/ReservationCancleModal";
import './ReservationConfirmPageMore.scss';




function ReservationConfirmPageMore() {
  const navigate = useNavigate();
  const accessToken = useSelector((state: any) => state.token.token);
  const dispatch = useDispatch();
  const [reservationData, setReservationData] = useState({
    bookingId: "",
    bookingState: "",
    canCancelDate: "",
    couponId: 0,
    couponPrice: "",
    endDt: "",
    finalPrice: "",
    originalPrice: "",
    point: 0,
    registDt: "",
    roomName: "",
    startDt: "",
    userName: "",
    userPhoneNo: "",
    place:{
      address: "",
      checkin: "",
      checkout: "",
      isBooking: 0,
      lowestPrice: null,
      mainPhotoUrl: "",
      name: "",
      placeId: 0,
      policy:"",
      wishId: 0
    }
  })
  const { bookingId } = useParams();
  const location: any = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
    if (bookingId !== undefined) {
      bookingGetData(
        { bookingId, accessToken },
        (response: AxiosResponse) => {
          setReservationData(response.data.data);
          console.log(response.data.data)
        },
        dispatch,
      );
    }
  }, []);

  const moveToMap = useCallback(() => {
    window.scroll({ top: document.body.scrollHeight, behavior: 'smooth' });
  }, []);
  

  const moveToPrevPage = useCallback(() => {
    navigate(-1);
  }, []);




  const copyPlaceAddress = useCallback(() => {
      navigator.clipboard.writeText(reservationData.place.address);
    }, [reservationData]);



  return (
    <div className="reservationPage">
      <div className="header">
        <Exit className="exit-button" onClick={moveToPrevPage} />
        <header className="header-title">숙소 정보 및 정책</header>
      </div>
      <div className="placeinfo">
        <div className="placeinfo-wrapper">
          <div className="placeinfo-name">{reservationData.place.name}</div>
        </div>
        <p className="placeinfo-address">{reservationData.place.address}</p>
        <p className="placeinfo-room">{reservationData.roomName}</p>
      </div>
      <div className="place-use-info">
        <div>숙소문의</div>
        <div aria-hidden="true" onClick={copyPlaceAddress}>주소복사</div>
        <div aria-hidden="true" onClick={moveToMap}>지도보기</div>
      </div>
      <div className="line-devide" />
      <div>{reservationData.place.policy}</div>
      <div className="reservation-place-map">
        <header className="reservation-place-map-header">지도</header>
        {reservationData.place.address ? <Map address={reservationData.place.address} /> : null}
      </div>
    </div>
  );
}

export default ReservationConfirmPageMore;