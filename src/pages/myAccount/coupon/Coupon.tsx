import React from 'react';
import { useEffect, useState, useRef ,useCallback } from 'react';
import axios, { AxiosResponse } from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useQuery } from 'react-query';
import { ReactComponent as Arrow } from '../../../common/icons/left-arrow.svg';
import './Coupon.scss';
import { tokenActions } from '../../../redux/slice/tokenSlice';
import { tokenRefresh } from '../../../common/api/login';
import { getCouponList } from '../../../common/api/coupon';
import AlertConfirmOne from '../../../common/dialog/AlertConfirmOne'
import { useErrorHandlers } from '../../../common/api/useErrorHandlers';
import BottomButton from '../../../common/components/BottomButton';
import { GET_MY_COUPON_LIST, CACHE_TIME, STALE_TIME } from '../../../common/constants/queryKey.const'
import {RootState} from '../../../redux/store'
import { ReactComponent as FootPrintActive } from "../../../common/icons/foot-print-active.svg";
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
  const [scheduledCoupon, setScheduledCoupon] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [couponRegistrationCompleted ,setCouponRegistrationCompleted]=useState(false)
  const userId = useSelector((state: RootState) => state.persist.user.user.id);
  const accessToken = useSelector((state: RootState) => state.token.token);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const refreshToken = localStorage.getItem('refreshToken') || '';

  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  const { isLoading: getCouponListIsLoading, data: couponList, refetch } = useQuery(
    GET_MY_COUPON_LIST,
    () => getCouponList(userId),
    {
      cacheTime: CACHE_TIME,
      staleTime: STALE_TIME,
      refetchInterval: false,
      onError: (error: any) => {
        useErrorHandlers(dispatch, error)
      }
    },
  );

  useEffect(()=>{
    refetch()
  },[isModalOpen])

  useEffect(() => {
    getScheduledCoupon();
  }, [couponList]);

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
          // navigate('/user/signin');
        }
      },
      dispatch,
    );
  }, [accessToken]);

  const getScheduledCoupon = () => {
    let count = 0;
    const date = new Date();
    const currentDateTime = date.getTime();
    couponList?.data.map((coupon: CouponType) => {
      const expireDateString = coupon.expireDt;
      const expireDate = new Date(expireDateString);
      const expireDateTime = expireDate.getTime();
      const differenceTime = expireDateTime - currentDateTime;
      const difference = Math.abs(differenceTime / (1000 * 60 * 60 * 24));

      if (difference <= 30) count += 1;
      return count;
    })
    setScheduledCoupon(count);
  };

  const modalOpen = () => {
    setIsModalOpen(true);
  };

  const modalClose = () => {
    if (isModalOpen) {
      setIsModalOpen(false);
    }
  };
  const confirmCouponRegisterCompletedOpen = useCallback(() => {
    setCouponRegistrationCompleted(true)
  },[])

  const confirmCouponRegisterCompletedClose = useCallback(() => {
    setCouponRegistrationCompleted(false)
  },[])

  const existCoupon = couponList?.data.map((coupon:CouponType) => {
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

  if (getCouponListIsLoading) {
    return <div className="coupon">&nbsp;</div>
  }

  return (
    <div className="coupon">
      <CouponModal openModal={isModalOpen} closeModal={modalClose} confirmCouponRegisterCompletedOpen={confirmCouponRegisterCompletedOpen}/>
      {couponRegistrationCompleted && <AlertConfirmOne text="쿠폰 등록이 완료 되었습니다" buttonHandler={confirmCouponRegisterCompletedClose} />}
      <div className="coupon-backdrop" aria-hidden="true" onClick={modalClose}>
        <div aria-hidden="true" className="myaccount-back" onClick={() => navigate(-1)}>
          <Arrow />
        </div>
        <header className="myaccount-header">쿠폰함</header>
        <div className="coupon-headline">
          <div className="coupon-count">쿠폰 {couponList.data.length}장</div>
          <span>30일 이내 소멸예정 쿠폰 {scheduledCoupon}장</span>
        </div>
        <div className="coupon-flexwrapper">
          {existCoupon?.length ?
            existCoupon :
            <div className='coupon-nocoupon'>
              <FootPrintActive />
              <div className='coupon-nocoupon-title'>쿠폰이 없어요ㅠㅠ</div>
              <div className='coupon-nocoupon-p'>{`'`}델고가요{`'`}를 입력해보세요</div>
            </div>}
        </div>
      </div>
      <div aria-hidden="true" onClick={modalOpen}><BottomButton text="쿠폰등록하기" /></div>
    </div>
  );
}

export default Coupon;
