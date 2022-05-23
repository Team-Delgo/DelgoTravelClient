import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AxiosResponse } from "axios";
import { useNavigate } from "react-router-dom";
import alertConfirm, { Button, alert } from "react-alert-confirm";
import "react-alert-confirm/dist/index.css";
import Footer from '../../common/components/Footer';
import "./MyAccount.scss";
import RightArrow from "../../icons/right-arrow.svg";
import { userActions } from "../../redux/reducers/userSlice";
import { tokenActions } from "../../redux/reducers/tokenSlice";
import AlertConfirm from "../../common/dialog/AlertConfirm";
import AlertConfirmOne from "../../common/dialog/AlertConfirmOne";
import { deleteUser } from "../../common/api/signup";


function MyAccount() {
  const [logoutModalOpen, setLogoutModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [text, setText] = useState('');
  const pet = useSelector((state: any) => state.persist.user.pet);
  console.log(pet);
  const navigation = useNavigate();
  const dispatch = useDispatch();
  const email = useSelector((state: any) => state.persist.user.user.email);

  const logoutHandler = () => {
    dispatch(userActions.signout());
    localStorage.removeItem('refreshToken');
    navigation('/user/signin');
  };

  const deleteHandler = () => {
    deleteUser(email, (response: AxiosResponse) => {
      console.log(response);
    });
    dispatch(userActions.signout());
    localStorage.removeItem('refreshToken');
    navigation('/user/signin');
  };

  const logOutModalOpen = () => {
    setLogoutModalOpen(true);
    setText('정말 로그아웃 하시겠습니까?');
  };

  const deleteUserModalOpen = () => {
    setDeleteModalOpen(true);
    setText('정말 회원탈퇴 하시겠어요?ㅠㅠ');
  };

  return (
    <div className="account">
      {logoutModalOpen && <AlertConfirm text={text}
        yesButtonHandler={logoutHandler}
        noButtonHandler={() => { setLogoutModalOpen(false); }}
      />}
      {deleteModalOpen && <AlertConfirm text={text}
        yesButtonHandler={deleteHandler}
        noButtonHandler={() => { setLogoutModalOpen(false); }}
      />}
      <div className="account-profile">
        <img className="account-profile-image" src={pet?.image} alt="dog" />
        <div className="account-profile-name">{pet?.name}</div>
        <div className="account-profile-info">
          <div className="account-proifle-info-coupon">
            <p className="account-profile-info-column">쿠폰</p>
            <p className="account-profile-info-value">3장</p>
          </div>
          <div className="account-proifle-info-point">
            <p className="account-profile-info-column">포인트</p>
            <p className="account-profile-info-value">15896</p>
          </div>
          <div className="account-proifle-info-review">
            <p className="account-profile-info-column">리뷰</p>
            <p className="account-profile-info-value">2건</p>
          </div>
        </div>
      </div>
      <div className="account-purchase">
        <div className="account-purchase-reservation">
          <h1 className="account-title">예약내역</h1>
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
        <div className="account-purchase-payment">
          <h1 className="account-title">결제</h1>
          <div className="account-item">
            <h2 className="account-item-name">결제내역</h2>
            <img src={RightArrow} alt="detail" />
          </div>
          <div className="account-item">
            <h2 className="account-item-name">결제방법</h2>
            <img src={RightArrow} alt="detail" />
          </div>
          <div className="account-item">
            <h2 className="account-item-name">결제방법</h2>
            <img src={RightArrow} alt="detail" />
          </div>
        </div>
      </div>
      <div className="account-settings">
        <h1 className="account-title">설정</h1>
        <div className="account-item">
          <h2 className="account-item-name">알림</h2>
          <img src={RightArrow} alt="detail" />
        </div>
        <div className="account-item">
          <h2 className="account-item-name">업데이트</h2>
          <img src={RightArrow} alt="detail" />
        </div>
        <div className="account-item">
          <h2 className="account-item-name">이용사항안내</h2>
          <img src={RightArrow} alt="detail" />
        </div>
      </div>
      <div className="account-sign">
        <p className="account-out" aria-hidden="true" onClick={deleteUserModalOpen}>회원탈퇴</p>
        <p className="account-out" aria-hidden="true" onClick={logOutModalOpen}>
          로그아웃
        </p>
      </div>
      <Footer />
    </div>
  );
};

export default MyAccount;