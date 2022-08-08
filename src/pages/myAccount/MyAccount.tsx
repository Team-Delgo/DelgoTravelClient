import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AxiosResponse } from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import { useQuery } from 'react-query';
import 'react-alert-confirm/dist/index.css';
import Footer from '../../common/components/FooterNavigation';
import { useErrorHandlers } from '../../common/api/useErrorHandlers';
import './MyAccount.scss';
import RightArrow from '../../icons/right-arrow.svg';
import RightArrowBlack from '../../icons/right-arrow-black.svg';
import { userActions } from '../../redux/slice/userSlice';
import { tokenActions } from '../../redux/slice/tokenSlice';
import { scrollActions } from '../../redux/slice/scrollSlice';
import AlertConfirm from '../../common/dialog/AlertConfirm';
import { deleteUser } from '../../common/api/signup';
import { MY_ACCOUNT_PATH } from '../../constants/path.const';
import { getBookingState, getMyAccountDataList } from '../../common/api/myaccount';
import { tokenRefresh } from '../../common/api/login';
import { RootState } from '../../redux/store';

function MyAccount() {
  const [logoutModalOpen, setLogoutModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [text, setText] = useState('');
  const [age, setAge] = useState(0);
  const [days, setDays] = useState('');
  const [bookingData, setBookingData] = useState({ place: '', room: '', startDt: '', endDt: '', state: 'W' });
  const pet = useSelector((state: RootState) => state.persist.user.pet);
  const navigation = useNavigate();
  const dispatch = useDispatch();
  const email = useSelector((state: RootState) => state.persist.user.user.email);
  const userId = useSelector((state: RootState) => state.persist.user.user.id);
  const dogBirth = useSelector((state: RootState) => state.persist.user.pet.birthday);
  const accessToken = useSelector((state: RootState) => state.token.token);
  const refreshToken = localStorage.getItem('refreshToken') || '';
  const location: any = useLocation();
  const { myAccountY } = useSelector((state: RootState) => state.persist.scroll);

  const {
    isLoading: getMyAccountDataListIsLoading,
    data: myAccountDataList,
    refetch,
  } = useQuery('getMyAccountDataList', () => getMyAccountDataList(userId), {
    cacheTime: 1000 * 60 * 5,
    staleTime: 1000 * 60 * 3,
    refetchInterval: false,
    onSuccess: () => {
      console.log(myAccountDataList);
    },
    onError: (error: any) => {
      useErrorHandlers(dispatch, error);
    },
  });

  useEffect(() => {
    if (location.state?.prevPath?.includes('/myaccount')) {
      window.scroll(0, Number(myAccountY));
    } else {
      window.scroll(0, 0);
    }
  }, [getMyAccountDataListIsLoading]);

  useEffect(() => {
    window.scrollTo(0, 0);
    const temp = `${dogBirth.slice(0, 4)}-${dogBirth.slice(5, 7)}-${dogBirth.slice(8, 10)}`;
    const date = new Date(temp);
    const now = new Date();
    // const age = now.getFullYear - date.getFullYear;
    console.log(now.getFullYear() - date.getFullYear());
    setAge(now.getFullYear() - date.getFullYear() + 1);
    getBookingData();
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
        }
        // else {
        //   navigation('/user/signin', { replace: true });
        // }
      },
      dispatch,
    );
  }, [accessToken]);

  const logoutHandler = () => {
    dispatch(tokenActions.setToken(''));
    dispatch(userActions.signout());
    localStorage.removeItem('refreshToken');
    navigation('/user/signin');
  };

  const deleteHandler = () => {
    deleteUser(
      userId.toString(),
      (response: AxiosResponse) => {
        console.log(response);
      },
      dispatch,
    );
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

  const getBookingData = () => {
    getBookingState(
      userId,
      (response: AxiosResponse) => {
        console.log(response);
        const { data } = response.data;
        if (data.length > 0) {
          setBookingData({
            place: data[0].place.name,
            room: data[0].roomName,
            startDt: data[0].startDt,
            endDt: data[0].endDt,
            state: data[0].bookingState,
          });
          const startDate = new Date(data[0].startDt);
          const endDate = new Date(data[0].endDt);
          const dateDif = endDate.getTime()- startDate.getTime();
          const dDay = dateDif / (1000 * 60 * 60 * 24);
          const dDayString = Math.ceil(dDay).toString();
          setDays(dDayString);
          }
      },
      dispatch,
    );
  };
  const moveToMyAccountPetInfoPage = () => {
    dispatch(scrollActions.scroll({ myAccount: window.scrollY }));
    navigation(MY_ACCOUNT_PATH.PETINFO);
  };
  const moveToMyAccountCouponPage = () => {
    dispatch(scrollActions.scroll({ myAccount: window.scrollY }));
    navigation(MY_ACCOUNT_PATH.COUPON);
  };
  const moveToMyAccountReviewsPage = () => {
    dispatch(scrollActions.scroll({ myAccount: window.scrollY }));
    navigation(MY_ACCOUNT_PATH.REVIEWS);
  };

  const moveToMyAccountUserInfoPage = () => {
    dispatch(scrollActions.scroll({ myAccount: window.scrollY }));
    navigation(MY_ACCOUNT_PATH.USERINFO);
  };

  const moveToMyAccountSettingsPage = () => {
    dispatch(scrollActions.scroll({ myAccount: window.scrollY }));
    navigation(MY_ACCOUNT_PATH.SETTINGS);
  };

  if (getMyAccountDataListIsLoading) {
    return <div className="account">&nbsp;</div>;
  }

  const bookingState = () => {
    if (bookingData.state === 'W') {
      return <div className="account-purchase-reservation-box-state W">예약요청</div>;
    }
    if (bookingData.state === 'F') {
      return <div className="account-purchase-reservation-box-state F">예약확정</div>;
    }
    if (bookingData.state === 'CW') {
      return <div className="account-purchase-reservation-box-state CW">취소요청</div>;
    }

    return <div className="account-purchase-reservation-box-state CF">취소완료</div>;
  };

  const bookingCard = bookingData.place ? (
    <div className="account-purchase-reservation-box">
      <div className="account-purchase-reservation-box-wrapper">
        <p className="account-purchase-reservation-box-wrapper-title">{bookingData.place}</p>
        <p className="account-purchase-reservation-box-wrapper-room">{bookingData.room}</p>
        <p className="account-purchase-reservation-box-wrapper-date">
          {bookingData.startDt.slice(5,7)}.{bookingData.startDt.slice(8,10)} ~ {bookingData.endDt.slice(5,7)}.{bookingData.endDt.slice(8,10)} {days}박
        </p>
      </div>
      {bookingState()}
    </div>
  ) : (
    <div className="account-purchase-reservation-box empty">최근 예약한 숙소가 없어요</div>
  );

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
        <img className="account-profile-image" src={pet?.image} alt="dog" />
        <div className="account-profile-info">
          <div className="account-profile-info-first">
            <div className="account-profile-info-name">{pet.name}</div>
            <span className="account-profile-info-age">/ {age}살</span>
            <img aria-hidden="true" src={RightArrowBlack} onClick={moveToMyAccountPetInfoPage} alt="detail" />
          </div>
          <div className="account-profile-info-second">
            <div className="account-profile-info-coupon" aria-hidden="true" onClick={moveToMyAccountCouponPage}>
              <p className="account-profile-info-column">쿠폰</p>
              <p className="account-profile-info-value">{myAccountDataList?.data.couponNum}장</p>
            </div>
            <div className="account-profile-info-point">
              <p className="account-profile-info-column">포인트</p>
              <p className="account-profile-info-value">0P</p>
            </div>
            <div className="account-profile-info-review" aria-hidden="true" onClick={moveToMyAccountReviewsPage}>
              <p className="account-profile-info-column">리뷰</p>
              <p className="account-profile-info-value">{myAccountDataList?.data.reviewNum}건</p>
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
        <a href="http://plus.kakao.com/home/@delgo">
          <div className="account-item last">
            <h2 className="account-item-name">문의</h2>
            <img src={RightArrow} alt="detail" />
          </div>
        </a>
        <a href="http://plus.kakao.com/home/@delgo">
          {' '}
          <p className="account-item-p">카카오 플러스친구로 이동</p>
        </a>
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
