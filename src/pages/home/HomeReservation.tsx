import React, { useRef, useEffect } from 'react';
import './HomeReservation.scss';

function HomeReservation() {
  const scrollRef = useRef<any>(null);
  useEffect(()=>{
    scrollRef.current.scrollIntoView({block:'end',inline:'nearest'});

  },[])
  return (
    <div className="homemodal" ref={scrollRef} >
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
