
import React,{useCallback , memo} from 'react'
import { useLocation,useNavigate} from 'react-router-dom';
import { useDispatch } from "react-redux";
import { scrollActions } from '../../../../redux/slice/scrollSlice';
import './TravelHistoryPlace.scss';

interface TraveledHisotryPlaceTypeProps {
  traveledPlace:TraveledHisotryPlaceType
}

interface TraveledHisotryPlaceType {
  bookingId: string,
  roomName: string,
  roomId:number,
  startDt: string,
  endDt: string,
  reviewExisting: boolean,
  place: {
    address: string
    checkin: string
    checkout: string
    isBooking: 0
    lowestPrice: null
    mainPhotoUrl: string
    name: string
    placeId: number
    wishId: number
  },
}

function TravelHisotryPlace({ traveledPlace }: TraveledHisotryPlaceTypeProps) {
  const dispatch = useDispatch();
  const location: any = useLocation();
  const navigate = useNavigate();

  const moveToReservationHistoryPage = useCallback(() => {
    dispatch(scrollActions.scroll({ whereToGo: 0, detailPlace: 0, myStorage: window.scrollY, homeY: 0 }));
    navigate(`/reservation-history/${traveledPlace.bookingId}`, { state: { prevPath: location.pathname } });
  }, []);

  const moveToReviewWritingPage = useCallback(() => {
    dispatch(scrollActions.scroll({ whereToGo: 0, detailPlace: 0, myStorage: window.scrollY, homeY: 0 }));
    navigate(`/review-writing/${traveledPlace.place.placeId}`, { state: traveledPlace });
  }, []);

  return (
    <div className="travel-hisotry-place">
      <div className="travel-hisotry-place-period">
        {traveledPlace.startDt.substring(5, 7)}.{traveledPlace.startDt.substring(8, 10)} -{' '}
        {traveledPlace.endDt.substring(5, 7)}.{traveledPlace.endDt.substring(8, 10)}
      </div>
      <div className="travel-hisotry-place-info">
        <img
          className="travel-hisotry-place-info-image"
          src={traveledPlace.place.mainPhotoUrl}
          alt="travel-place-img"
        />
        <div className="travel-hisotry-place-info-detail">
          <div className="travel-hisotry-place-info-detail-name">{traveledPlace.place.name}</div>
          <div className="travel-hisotry-place-info-detail-address">{traveledPlace.place.address}</div>
          <div className="travel-hisotry-place-info-detail-package">{traveledPlace.roomName}</div>
        </div>
      </div>
      <div className="travel-hisotry-place-review">
        {
          traveledPlace.reviewExisting===true ? <div className="travel-hisotry-place-review-write-completion">리뷰작성완료</div> :
              <div className="travel-hisotry-place-review-write" aria-hidden="true" onClick={moveToReviewWritingPage}>리뷰쓰기</div>
        }
          <div className="travel-hisotry-place-review-reservation-detail" aria-hidden="true" onClick={moveToReservationHistoryPage}>예약상세</div>
      </div>
    </div>
  );
}

export default memo(TravelHisotryPlace);