import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AxiosResponse } from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import { useQuery } from 'react-query';
import 'react-alert-confirm/dist/index.css';
import Footer from '../../common/components/FooterNavigation';
import { useErrorHandlers } from '../../common/api/useErrorHandlers';
import './MyAccount.scss';
import RightArrow from '../../common/icons/right-arrow.svg';
import RightArrowBlack from '../../common/icons/right-arrow-black.svg';
import { userActions } from '../../redux/slice/userSlice';
import { scrollActions } from '../../redux/slice/scrollSlice';
import AlertConfirm from '../../common/dialog/AlertConfirm';
import { deleteUser } from '../../common/api/signup';
import { MY_ACCOUNT_PATH, SIGN_IN_PATH, RESERVATION_PATH } from '../../common/constants/path.const';
import {  getMyAccountDataList } from '../../common/api/myaccount';
import { getBookingState } from '../../common/api/booking';
import { GET_MY_ACCOUNT_DATA_LIST, GET_BOOKING_STATE_DATA_LIST, CACHE_TIME, STALE_TIME } from '../../common/constants/queryKey.const'
import { RootState } from '../../redux/store';

const loadingScreenHeight = { height: window.innerHeight * 10 }

function MyAccount() {
  const [logoutModalOpen, setLogoutModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [text, setText] = useState('');
  const [age, setAge] = useState(0);
  const [days, setDays] = useState('1');
  const navigation = useNavigate();
  const dispatch = useDispatch();
  const location: any = useLocation();
  const pet = useSelector((state: RootState) => state.persist.user.pet);
  const userId = useSelector((state: RootState) => state.persist.user.user.id);
  const dogBirth = useSelector((state: RootState) => state.persist.user.pet.birthday);
  const { myAccountScrollY } = useSelector((state: RootState) => state.persist.scroll);
  const { OS } = useSelector((state: RootState) => state.persist.device);

  const {
    isLoading: getMyAccountDataListIsLoading,
    data: myAccountDataList,
  } = useQuery(GET_MY_ACCOUNT_DATA_LIST, () => getMyAccountDataList(userId), {
    cacheTime: CACHE_TIME,
    staleTime: STALE_TIME,
    onError: (error: any) => {
      useErrorHandlers(dispatch, error);
    },
  });

  const { isLoading: getBookingStateIsLoading, data: bookingStateDataList } = useQuery(
    GET_BOOKING_STATE_DATA_LIST,
    () => getBookingState(userId, dispatch),
    {
      cacheTime: CACHE_TIME,
      staleTime: STALE_TIME,
      onError: (error: any) => {
        useErrorHandlers(dispatch, error);
      },
    },
  );

  useEffect(() => {
    if (location.state?.prevPath.includes(MY_ACCOUNT_PATH.MAIN)) {
      window.scroll(0, myAccountScrollY);
    } else if (location.state?.prevPath.includes('reservation')) {
      window.scroll(0, myAccountScrollY);
    } else {
      window.scroll(0, 0);
    }
  }, [getMyAccountDataListIsLoading, getBookingStateIsLoading]);

  useEffect(() => {
    const startDate = new Date(bookingStateDataList?.data[0]?.startDt);
    const endDate = new Date(bookingStateDataList?.data[0]?.endDt);
    const dateDif = endDate.getTime() - startDate.getTime();
    const dDay = dateDif / (1000 * 60 * 60 * 24);
    const dDayString = Math.ceil(dDay).toString();
    setDays(dDayString);
  }, [getBookingStateIsLoading]);

  useEffect(() => {
    const temp = `${dogBirth.slice(0, 4)}-${dogBirth.slice(5, 7)}-${dogBirth.slice(8, 10)}`;
    const date = new Date(temp);
    const now = new Date();
    setAge(now.getFullYear() - date.getFullYear() + 1);
  }, []);



  const logoutHandler = useCallback(() => {
    dispatch(userActions.signout());
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    navigation(SIGN_IN_PATH.MAIN);
  },[])

  const deleteHandler = useCallback(() => {
    deleteUser(
      userId.toString(),
      (response: AxiosResponse) => {
        console.log(response);
      },
      dispatch,
    );
    dispatch(userActions.signout());
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    navigation(SIGN_IN_PATH.MAIN);
  },[])

  const logOutModalOpen = useCallback(() => {
    setLogoutModalOpen(true);
    setText('정말 로그아웃 하시겠습니까?');
  },[])

  const deleteUserModalOpen = () => {
    setDeleteModalOpen(true);
    setText('정말 회원탈퇴 하시겠어요?ㅠㅠ');
  };

  const moveToMyAccountPetInfoPage = useCallback(() => {
    setTimeout(() => {
      dispatch(scrollActions.myStorageScroll({ myAccount: window.scrollY }));
      navigation(MY_ACCOUNT_PATH.PETINFO);
    }, 200);
  },[])

  const moveToMyAccountCouponPage = useCallback(() => {
    setTimeout(() => {
      dispatch(scrollActions.myStorageScroll({ myAccount: window.scrollY }));
      navigation(MY_ACCOUNT_PATH.COUPON);
    }, 200);
  },[])

  const moveToMyAccountReviewsPage = useCallback(() => {
    setTimeout(() => {
      dispatch(scrollActions.myStorageScroll({ myAccount: window.scrollY }));
      navigation(MY_ACCOUNT_PATH.REVIEWS);
    }, 200);
  },[])

  const moveToMyAccountUserInfoPage = useCallback(() => {
    setTimeout(() => {
      dispatch(scrollActions.myStorageScroll({ myAccount: window.scrollY }));
      navigation(MY_ACCOUNT_PATH.USERINFO);
    }, 200)
  },[])

  const moveToMyAccountSettingsPage = useCallback(() => {
    setTimeout(() => {
      dispatch(scrollActions.myStorageScroll({ myAccount: window.scrollY }));
      navigation(MY_ACCOUNT_PATH.SETTINGS);
    }, 200);
  },[])

  const moveToReservationConfirmPage = () => {
    setTimeout(() => {
      dispatch(scrollActions.myStorageScroll({ myAccount: window.scrollY }));
      navigation(`/reservation-confrim/${bookingStateDataList.data[0].bookingId}`, {
        state: {
          prevPath: location.pathname,
        },
      });
    }, 200);
  }

  const moveToReservationCanclePage = () => {
    setTimeout(() => {
      dispatch(scrollActions.myStorageScroll({ myAccount: window.scrollY }));
      navigation(`/reservation-cancle/${bookingStateDataList.data[0].bookingId}`, {
        state: {
          prevPath: location.pathname,
        },
      });
    }, 200);
  }

  const moveToKakaoPlusFriend = useCallback(() => {
    if (OS === 'android') {
      window.BRIDGE.goToPlusFriends();
    } else {
      window.webkit.messageHandlers.goToPlusFriends.postMessage('');
    }
  },[])

  const bookingState = () => {
    if (bookingStateDataList.data[0].bookingState === 'W') {
      return <div className="account-purchase-reservation-box-state W">예약요청</div>;
    }
    if (bookingStateDataList.data[0].bookingState === 'F') {
      return <div className="account-purchase-reservation-box-state F">예약확정</div>;
    }
    if (bookingStateDataList.data[0].bookingState === 'CW') {
      return <div className="account-purchase-reservation-box-state CW">취소요청</div>;
    }

    return <div className="account-purchase-reservation-box-state CF">취소완료</div>;
  };

  const bookingCard =
    bookingStateDataList?.data?.length > 0 ? (
      <div
        className="account-purchase-reservation-box"
        aria-hidden="true"
        onClick={
          bookingStateDataList.data[0].bookingState === 'CW' || 'CF'
            ? moveToReservationCanclePage
            : moveToReservationConfirmPage
        }
      >
        <div className="account-purchase-reservation-box-wrapper">
          <p className="account-purchase-reservation-box-wrapper-title">{bookingStateDataList?.data[0].place.name}</p>
          <p className="account-purchase-reservation-box-wrapper-room">{bookingStateDataList?.data[0].roomName}</p>
          <p className="account-purchase-reservation-box-wrapper-date">
            {bookingStateDataList?.data[0].startDt.slice(5, 7)}.{bookingStateDataList?.data[0].startDt.slice(8, 10)} ~{' '}
            {bookingStateDataList?.data[0].endDt.slice(5, 7)}.{bookingStateDataList?.data[0].endDt.slice(8, 10)} {days}
            박
          </p>
        </div>
        {bookingState()}
      </div>
    ) : (
      <div className="account-purchase-reservation-box empty">최근 예약한 숙소가 없어요</div>
    );

  if (getMyAccountDataListIsLoading || getBookingStateIsLoading) {
    return (
      <div className="account" style={loadingScreenHeight}>
        <Footer />
      </div>
    );
  }

  return (
    <div className="account">
      {logoutModalOpen && (
        <AlertConfirm
          text={text}
          buttonText="확인"
          yesButtonHandler={logoutHandler}
          noButtonHandler={() => {
            setLogoutModalOpen(false);
          }}
        />
      )}
      {deleteModalOpen && (
        <AlertConfirm
          text={text}
          buttonText="확인"
          yesButtonHandler={deleteHandler}
          noButtonHandler={() => {
            setDeleteModalOpen(false);
          }}
        />
      )}
      <div className="account-profile">
        <img className="account-profile-image" src={pet.image} alt="dog" />
        <div className="account-profile-info">
          <div className="account-profile-info-first">
            <div className="account-profile-info-name">{pet.name}</div>
            <span className="account-profile-info-age">/ {age}살</span>
            <img aria-hidden="true" src={RightArrowBlack} onClick={moveToMyAccountPetInfoPage} alt="detail" />
          </div>
          <div className="account-profile-info-second">
            <div className="account-profile-info-item" aria-hidden="true" onClick={moveToMyAccountCouponPage}>
              <p className="account-profile-info-column">쿠폰</p>
              <p className="account-profile-info-value">{myAccountDataList?.data?.couponNum}장</p>
            </div>
            <div className="account-profile-info-item">
              <p className="account-profile-info-column">포인트</p>
              <p className="account-profile-info-value">0P</p>
            </div>
            <div className="account-profile-info-item" aria-hidden="true" onClick={moveToMyAccountReviewsPage}>
              <p className="account-profile-info-column">리뷰</p>
              <p className="account-profile-info-value">{myAccountDataList?.data?.reviewNum}건</p>
            </div>
          </div>
        </div>
      </div>
      <div className="account-purchase">
        <div className="account-purchase-reservation">
          <h1 className="account-title">예약 현황</h1>
          {bookingCard}
        </div>
      </div>
      <div className="account-settings">
        <div className="account-item first" aria-hidden="true" onClick={moveToMyAccountUserInfoPage}>
          <h2 className="account-item-name">내 정보 관리</h2>
          <img src={RightArrow} alt="detail" />
        </div>
        <div className="account-item" aria-hidden="true" onClick={moveToMyAccountSettingsPage}>
          <h2 className="account-item-name">설정</h2>
          <img src={RightArrow} alt="detail" />
        </div>
        <div className="account-item">
          <h2 className="account-item-name">공지사항</h2>
          <img src={RightArrow} alt="detail" />
        </div>
        <div className="account-item last" aria-hidden="true" onClick={moveToKakaoPlusFriend}>
          <h2 className="account-item-name">
            문의
            <p className="account-item-p">카카오 플러스친구로 이동</p>
          </h2>
          <img src={RightArrow} alt="detail" />
        </div>
      </div>
      <div className="account-sign">
        <p className="account-out" aria-hidden="true" onClick={logOutModalOpen}>
          로그아웃
        </p>
        {/* <p className="account-out" aria-hidden="true" onClick={deleteUserModalOpen}>
          회원탈퇴
        </p> */}
      </div>
      <Footer />
    </div>
  );
}

export default MyAccount;
