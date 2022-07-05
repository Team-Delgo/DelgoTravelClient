import React, { useRef, useEffect, useState } from 'react';
import './HomeReservation.scss';

function HomeReservation() {
  const scrollRef = useRef<any>(null);
  const [position, setPosition] = useState(0);
  const [startPosition, setStartPosition] = useState(0);
  const [page, setPage] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);

  // useEffect(() => {
  //   setIsScrolling(false);
  //   setTimeout(() => {
  //     if (!isScrolling) {
  //       console.log(1);
  //     }
  //   }, 50)
  // }, [isScrolling]);

  const scrollHandler = () => {
    setIsScrolling(true);
    setPosition(scrollRef.current.scrollLeft);
  };

  const mouseLeaveHandler = () => {
    const el = scrollRef.current;
    const width = el.offsetWidth;
    console.log(position, startPosition);
    setTimeout(() => {
      if (position < startPosition) {
        el.scrollTo({
          left: (Math.floor(el.scrollLeft / width)) * width,
          behavior: "smooth"
        });
        setPosition(startPosition - width);
        setPage(Math.floor(el.scrollLeft / width));
      }
      else if (position > startPosition) {
        el.scrollTo({
          left: (Math.floor(el.scrollLeft / width) + 1) * width,
          behavior: "smooth"
        });
        setPosition(startPosition + width);
        setPage(Math.floor(el.scrollLeft / width));
      } else {
        el.scrollTo({
          left: startPosition,
          behavior: "smooth"
        })
      }
    }, 400);
  };



  const mouseDownHandler = () => {
    const el = scrollRef.current;
    const width = el.offsetWidth;
    const currentPosition = el.scrollLeft;
    const main = (Math.floor(currentPosition / width)) * width;
    setStartPosition(main);
  };

  // useEffect(() => {
  //   const el = scrollRef.current;
  //   const width = el.offsetWidth;
  //   const currentPosition = el.scrollLeft;
  //   console.log(currentPosition);
  //   setTimeout(() => {
  //     el.scrollTo({
  //       left: (Math.floor(currentPosition / width)) * width,
  //       behavior: "smooth"
  //     });
  //     console.log(currentPosition);
  //   }, 500);

  // }, [endPosition]);

  console.log(page);

  return (
    <div aria-hidden="true" className="homemodal" ref={scrollRef} onScroll={scrollHandler} onTouchStart={mouseDownHandler} onTouchEnd={mouseLeaveHandler}>
      <div className="homemodal-item">
        <div className="homemodal-item-card">1</div>
      </div>
      <div className="homemodal-item">
        <div className="homemodal-item-card">1</div>
      </div>
      <div className="homemodal-item">
        <div className="homemodal-item-card">1</div>
      </div>
    </div>
  );
}

export default HomeReservation;
