import React, { useRef, useEffect } from 'react';
import './HomeReservation.scss';

function HomeReservation() {
  const scrollRef = useRef<any>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) {
      const onWheel = (e: any) => {
        if (e.deltaY === 0) return;
        e.preventDefault();
        el.scrollTo({
          left: el.scrollLeft + e.deltaY,
          behavior: "smooth"
        });
      };
      el.addEventListener("wheel", onWheel);
      return () => el.removeEventListener("wheel", onWheel);
    }
  }, []);

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
