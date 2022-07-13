import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AxiosResponse } from 'axios';
import { useNavigate } from 'react-router-dom';
import alertConfirm, { Button, alert } from 'react-alert-confirm';
import 'react-alert-confirm/dist/index.css';
import Footer from '../../common/components/Footer';
import './MyAccount.scss';
import RightArrow from '../../icons/right-arrow-black.svg';
import { userActions } from '../../redux/slice/userSlice';
import { tokenActions } from '../../redux/slice/tokenSlice';
import AlertConfirm from '../../common/dialog/AlertConfirm';
import AlertConfirmOne from '../../common/dialog/AlertConfirmOne';
import { deleteUser } from '../../common/api/signup';
import { MY_ACCOUNT_PATH } from '../../constants/path.const';
import { myAccount } from '../../common/api/myaccount';

function MyAccount() {
  const [logoutModalOpen, setLogoutModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [text, setText] = useState('');
  const [items, setItems] = useState({ coupons: 0, points: 0, reviews: 0 });
  const pet = useSelector((state: any) => state.persist.user.pet);
  const navigation = useNavigate();
  const dispatch = useDispatch();
  const email = useSelector((state: any) => state.persist.user.user.email);
  const userId = useSelector((state: any) => state.persist.user.user.id);

  useEffect(() => {
    window.scrollTo(0, 0);
    getUserInfo();
  }, []);

  const getUserInfo = () => {
    const data = {
      userId,
    };
    console.log(data);
    myAccount(
      data,
      (response: AxiosResponse) => {
        const { data } = response.data;
        setItems((prev) => {
          return { ...prev, coupons: data.couponNum, reviews: data.reviewNum };
        });
      },
      dispatch,
    );
  };

  const logoutHandler = () => {
    dispatch(userActions.signout());
    localStorage.removeItem('refreshToken');
    navigation('/user/signin');
  };

  const deleteHandler = () => {
    deleteUser(
      email,
      (response: AxiosResponse) => {
        console.log(response);
      },
      dispatch,
    );
    dispatch(userActions.signout());
    localStorage.removeItem('refreshToken');
    // navigation('/user/signin');
  };

  const logOutModalOpen = () => {
    setLogoutModalOpen(true);
    setText('정말 로그아웃 하시겠습니까?');
  };

  const deleteUserModalOpen = () => {
    setDeleteModalOpen(true);
    setText('정말 회원탈퇴 하시겠어요?ㅠㅠ');
  };

  const navigateCouponPage = () => {
    navigation('/user/myaccount/coupon');
  };

  return (
    <div className="account">
      {logoutModalOpen && (
        <AlertConfirm
          text={text}
          yesButtonHandler={logoutHandler}
          noButtonHandler={() => {
            setLogoutModalOpen(false);
          }}
        />
      )}
      {deleteModalOpen && (
        <AlertConfirm
          text={text}
          yesButtonHandler={deleteHandler}
          noButtonHandler={() => {
            setDeleteModalOpen(false);
          }}
        />
      )}
      <div className="account-profile">
        <img className="account-profile-image" src={pet?.image} alt="dog" />
        <div className="account-profile-info">
          <div className='account-profile-info-first'>
            <div className="account-profile-info-name">{pet.name}</div>
            <span className="account-profile-info-age">/ 5살</span>
            <img
              aria-hidden="true"
              src={RightArrow}
              onClick={() => {
                navigation(MY_ACCOUNT_PATH.PETINFO);
              }}
              alt="detail"
            />
          </div>
          <div className='account-profile-info-second'>
            <div className="account-profile-info-coupon" aria-hidden="true" onClick={navigateCouponPage}>
              <p className="account-profile-info-column">쿠폰</p>
              <p className="account-profile-info-value">{items.coupons}장</p>
            </div>
            <div className="account-profile-info-point">
              <p className="account-profile-info-column">포인트</p>
              <p className="account-profile-info-value">{items.points}</p>
            </div>
            <div className="account-profile-info-review">
              <p className="account-profile-info-column">리뷰</p>
              <p className="account-profile-info-value">{items.reviews}건</p>
            </div>
          </div>
        </div>
      </div>
      <div className="account-purchase">
        <div className="account-purchase-reservation">
          <h1 className="account-title">여행 내역</h1>
          <div className="account-purchase-reservation-box">
            <div className="account-purchase-reservation-box-wrapper">
              <p className="account-purchase-reservation-box-wrapper-title">밸런스독</p>
              <p className="account-purchase-reservation-box-wrapper-room">프리미엄 한옥빌라[102동 온수...</p>
              <p className="account-purchase-reservation-box-wrapper-date">05.06~05.07 1박</p>
            </div>
            <button type="button" className="account-purchase-reservation-box-state">
              취소완료
            </button>
          </div>
        </div>
      </div>
      <div
        className="account-settings"
        aria-hidden="true"
        onClick={() => {
          navigation(MY_ACCOUNT_PATH.SETTINGS);
        }}
      >
        <div className="account-item first">
          <h2 className="account-item-name">내 정보 관리</h2>
          <img src={RightArrow} alt="detail" />
        </div>
        <div className="account-item">
          <h2 className="account-item-name">설정</h2>
          <img src={RightArrow} alt="detail" />
        </div>
        <div className="account-item">
          <h2 className="account-item-name">공지사항</h2>
          <img src={RightArrow} alt="detail" />
        </div>
        <div className="account-item last">
          <h2 className="account-item-name">문의</h2>
          <img src={RightArrow} alt="detail" />
        </div>
        <p className="account-item-p">카카오 플러스친구로 이동</p>
      </div>
      <div className="account-sign">
        <p className="account-out" aria-hidden="true" onClick={deleteUserModalOpen}>
          회원탈퇴
        </p>
        <p className="account-out" aria-hidden="true" onClick={logOutModalOpen}>
          로그아웃
        </p>
      </div>
      <Footer />
    </div>
  );
}

export default MyAccount;
