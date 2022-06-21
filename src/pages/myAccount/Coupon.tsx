import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ReactComponent as Arrow } from '../../icons/left-arrow.svg';
import './Coupon.scss';
import { url } from '../../constants/url.cosnt';

interface CouponType {
  couponId: number;
  userId: number;
  couponManagerId: number;
  isUsed: number;
  registDt: string;
  expireDt: string;
  couponType: string;
  discountNum: number;
}

function Coupon() {
  const [couponList, setCouponList] = useState<CouponType[]>([]);
  const userId = useSelector((state: any) => state.persist.user.user.id);
  const accessToken = useSelector((state: any) => state.persist.token);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  let existCoupon;

  useEffect(() => {
    getCouponList();
  }, []);

  const getCouponList = async () => {
    const response = await axios.get(`${url}/coupon/getCouponList?userId=${userId}`);
    const { data } = response.data.data;
    setCouponList(data);
    console.log(response);
    existCoupon = couponList.map((coupon) => {
      return <div className="coupon">1</div>;
    });
  };

  return (
    <div className="coupon">
      <div aria-hidden="true" className="myaccount-back" onClick={() => navigate(-1)}>
        <Arrow />
      </div>
      <header className="myaccount-header">쿠폰함</header>
      <div className="coupon-headline">
        <div className="coupon-count">쿠폰 2장</div>
        <span>30일 이내 소멸예정 쿠폰 1장</span>
      </div>
      <div className="coupon-flexwrapper">
        <div aria-hidden="true" className="coupon-regist">
          +쿠폰등록하기
        </div>
        <div className="coupon-item">
          <header className="coupon-item-header">Delgo 가요</header>
          <h3 className="coupon-item-name">10,000원 할인</h3>
          <div className="coupon-item-condition">7만원 이상 결제 시</div>
          <div className="coupon-item-date">2022.05.23-2022.08.01</div>
        </div>
      </div>
    </div>
  );
}

export default Coupon;
