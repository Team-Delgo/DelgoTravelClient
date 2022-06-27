import React from 'react';
import { useEffect, useState, useRef } from 'react';
import axios, { AxiosResponse } from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ReactComponent as Arrow } from '../../icons/left-arrow.svg';
import './Coupon.scss';
import { tokenActions } from '../../redux/reducers/tokenSlice';
import { url } from '../../constants/url.cosnt';
import { tokenRefresh } from '../../common/api/login';
import { ReactComponent as FootPrintActive } from "../../icons/foot-print-active.svg";
import CouponModal from './CouponModal';

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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const userId = useSelector((state: any) => state.persist.user.user.id);
  const accessToken = useSelector((state: any) => state.token.token);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const refreshToken = localStorage.getItem('refreshToken') || '';
  const registRef = useRef<any>();

  useEffect(() => {
    getCouponList();
    couponRegist();
  }, []);

  useEffect(() => {
    tokenRefresh(
      { refreshToken },
      (response: AxiosResponse) => {
        const { code } = response.data;

        if (code === 200) {
          const accessToken = response.headers.authorization_access;
          const refreshToken = response.headers.authorization_refresh;

          dispatch(tokenActions.setToken(accessToken));
          localStorage.setItem('refreshToken', refreshToken);
        } else {
          navigate('/user/signin');
        }
      },
      dispatch,
    );
  }, [accessToken]);


  const getCouponList = async () => {
    const response = await axios.get(`${url}/coupon/getCouponList?userId=${userId}`);
    const { data } = response.data;
    setCouponList(data);
    console.log(response);
    console.log(data);

  };

  const couponRegist = async () => {
    console.log(userId);
    const response = await axios.post(`${url}coupon/regist`, {
      userId,
      couponCode: 'asdf',
    });
    console.log(response);
  };

  const modalOpen = () => {
    setIsModalOpen(true);
  };

  const modalClose = () => {
    if (isModalOpen) {
      setIsModalOpen(false);
    }
  };

  const existCoupon = couponList.map((coupon) => {
    const priceString = coupon.discountNum.toString();
    const price = `${priceString.slice(0, priceString.length - 3)},${priceString.slice(priceString.length - 3)}`;
    const registDate = `${coupon.registDt.slice(0, 4)}.${coupon.registDt.slice(5, 7)}.${coupon.registDt.slice(8, 10)}`;
    const expireDate = `${coupon.expireDt.slice(0, 4)}.${coupon.expireDt.slice(5, 7)}.${coupon.expireDt.slice(8, 10)}`;

    return (
      <div className="coupon-item">
        <header className="coupon-item-header">Delgo 가요</header>
        <h3 className="coupon-item-name">{price}원 할인</h3>
        <div className="coupon-item-condition">7만원 이상 결제 시</div>
        <div className="coupon-item-date">{registDate}-{expireDate}</div>
      </div>
    );
  });
  console.log(existCoupon);

  return (
    <div className="coupon">
      {isModalOpen && <CouponModal />}
      <div className="coupon-backdrop" aria-hidden="true" onClick={modalClose}>
        <div aria-hidden="true" className="myaccount-back" onClick={() => navigate(-1)}>
          <Arrow />
        </div>
        <header className="myaccount-header">쿠폰함</header>
        <div className="coupon-headline">
          <div className="coupon-count">쿠폰 {couponList && couponList.length}장</div>
          <span>30일 이내 소멸예정 쿠폰 1장</span>
        </div>
        <div className="coupon-flexwrapper">
          <div aria-hidden="true" className="coupon-regist" onClick={modalOpen}>
            쿠폰등록하기
          </div>
          {existCoupon.length ?
            existCoupon :
            <div className='coupon-nocoupon'>
              <FootPrintActive />
              <div className='coupon-nocoupon-title'>쿠폰이 없어요ㅠㅠ</div>
              <div className='coupon-nocoupon-p'>{`'`}델고가요{`'`}를 입력해보세요</div>
            </div>}
        </div>
      </div>
    </div>
  );
}

export default Coupon;
