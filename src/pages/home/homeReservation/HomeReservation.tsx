import React, { useRef, useEffect, useState, memo } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import './HomeReservation.scss';
import RightArrow from '../../../common/icons/right-arrow-black.svg';
import Location from '../../../common/icons/location.svg';
import Call from '../../../common/icons/call.svg';
import { RootState } from '../../../redux/store';


function HomeReservation(props: { lists: any[]; pageChange: (page: number) => void }) {
  const { lists, pageChange } = props;
  const scrollRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState(0);
  const [startPosition, setStartPosition] = useState(0);
  const [page, setPage] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const { OS } = useSelector((state: RootState) => state.persist.device);
  const infoArray = lists.map((list) => {
    const today = new Date();
    const bookDate = new Date(list.startDt);
    return {
      location: list.place.address.slice(0, 2),
      date: 1,
    };
  });

  useEffect(() => {
    pageChange(page);
  }, [page]);

  const scrollHandler = () => {
    setIsScrolling(true);
    if (scrollRef.current) {
      setPosition(scrollRef.current.scrollLeft);
    }
  };

  const mouseLeaveHandler = () => {
    if (scrollRef.current) {
      const el = scrollRef.current;
      const width = el.offsetWidth;
      setTimeout(() => {
        if (position < startPosition) {
          el.scrollTo({
            left: Math.floor(el.scrollLeft / width) * width,
            behavior: 'smooth',
          });
          setPosition(startPosition - width);
          setPage(Math.floor(el.scrollLeft / width));
        } else if (position > startPosition) {
          el.scrollTo({
            left: (Math.floor(el.scrollLeft / width) + 1) * width,
            behavior: 'smooth',
          });
          setPosition(startPosition + width);
          setPage(Math.floor(el.scrollLeft / width) + 1);
        } else {
          el.scrollTo({
            left: startPosition,
            behavior: 'smooth',
          });
        }
      }, 400);
    }
  };

  const mouseDownHandler = () => {
    if (scrollRef.current) {
      const el = scrollRef.current;
      const width = el.offsetWidth;
      const currentPosition = el.scrollLeft;
      const main = Math.floor(currentPosition / width) * width;
      setStartPosition(main);
    }
  };

  const moveToCallApp = (placeTelePhoneNumber: string) => (event: React.MouseEvent) => {
    window.webkit.messageHandlers.numToCall.postMessage(`tel://${placeTelePhoneNumber}`);
  };

  const reservationList = lists.map((list) => {
    const days = ['일', '월', '화', '수', '목', '금', '토'];
    let startDate = `${list.startDt.slice(5, 7)}/${list.startDt.slice(8, 10)}`;
    if (startDate[3] === '0') {
      startDate = startDate.slice(0, 3) + startDate.slice(4);
    }
    if (startDate[0] === '0') {
      startDate = startDate.slice(1);
    }
    const startDayTemp = new Date(list.startDt);
    const startDay = days[startDayTemp.getDay()];
    let endDate = `${list.endDt.slice(5, 7)}/${list.endDt.slice(8, 10)}`;
    if (endDate[3] === '0') {
      endDate = endDate.slice(0, 3) + endDate.slice(4);
    }
    if (endDate[0] === '0') {
      endDate = endDate.slice(1);
    }
    const endDayTemp = new Date(list.endDt);
    const endDay = days[endDayTemp.getDay()];
    const placeTelePhonNumber = list.place.phoneNo;
    const placeNaverMapUrl = list.place.mapUrl;

    return (
      <div className="homemodal-item">
        <div className="homemodal-item-card">
          <img className="homemodal-item-image" src={list.place.mainPhotoUrl} alt="placeimage" />
          <div className="homemodal-item-wrapper">
            <Link to={`/reservation-confirm/${list.bookingId}`}>
              <div className="homemodal-item-card-title">
                <div className="homemodal-item-card-title-place">{list.place.name}</div>
                <img aria-hidden="true" src={RightArrow} alt="detail" />
              </div>
            </Link>
            <div className="homemodal-item-card-checkinout">
              <div className="homemodal-item-card-first">
                <div className="homemodal-item-card-check">체크인</div>
                <div className="homemodal-item-card-date">
                  {startDate} {startDay}
                </div>
                <div className="homemodal-item-card-time">{list.place.checkin.slice(0, 5)}</div>
                <a href={placeNaverMapUrl}>
                  <div className="homemodal-item-card-button">
                    <img className="homemodal-item-card-location" src={Location} alt="location" />
                    <div className="homemodal-item-card-label">지도</div>
                  </div>
                </a>
              </div>
              <div className="homemodal-item-card-second">
                <div className="homemodal-item-card-check">체크아웃</div>
                <div className="homemodal-item-card-date">
                  {endDate} {endDay}
                </div>
                <div className="homemodal-item-card-time">{list.place.checkout.slice(0, 5)}</div>
                {OS === 'android' ? (
                  <a href={`tel: ${placeTelePhonNumber}`}>
                    <div className="homemodal-item-card-button" aria-hidden="true">
                      <img className="homemodal-item-card-location" src={Call} alt="call" />
                      <div className="homemodal-item-card-label">전화</div>
                    </div>
                  </a>
                ) : (
                  <div
                    className="homemodal-item-card-button"
                    aria-hidden="true"
                    onClick={moveToCallApp(placeTelePhonNumber)}
                  >
                    <img className="homemodal-item-card-location" src={Call} alt="call" />
                    <div className="homemodal-item-card-label">전화</div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  });

  return (
    <div
      aria-hidden="true"
      className="homemodal"
      ref={scrollRef}
      onScroll={scrollHandler}
      onTouchStart={mouseDownHandler}
      onTouchEnd={mouseLeaveHandler}
    >
      {reservationList}
    </div>
  );
}

export default memo(HomeReservation);
