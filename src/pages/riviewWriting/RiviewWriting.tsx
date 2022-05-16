import React,{useEffect,useState} from 'react'
import { useLocation } from 'react-router-dom'; 
import BottomButton from '../../common/layouts/BottomButton';
import './RiviewWriting.scss';

interface ReservationPlaceType {
    id: number,
    period: string,
    image: string,
    name: string,
    address: string
    package: string
  }

function RiviewWriting() {
  const state = useLocation().state as ReservationPlaceType;

  return (
    <div className="review-writing">
      <div className="review-writing-header">
        <img className="review-writing-header-main-image" src={state.image} alt="place-img" />
        <div className="review-writing-header-place-name">{state.name}</div>
        <div className="review-writing-header-date">{state.period}</div>
      </div>
      <div className="review-writing-body">
        <h4>쪼꼬와의 이용이 어땠나요?</h4>
      </div>
      <BottomButton text="작성완료" />
    </div>
  );
}

export default RiviewWriting;