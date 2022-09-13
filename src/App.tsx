import React, { useEffect } from 'react';
import axios, { AxiosResponse } from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { Route, Routes, useLocation } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import HomePage from './pages/home/HomePage';
import EditorNote from './pages/editorNote/EditorNotePage';
import SignInPage from './pages/signInPage/SignIn';
import VerifyPhonePage from './pages/signUpPage/verifyphone/VerifyPhone';
import TermsPage from './pages/signUpPage/terms/Terms';
import UserInfo from './pages/signUpPage/userInfo/UserInfo';
import PetInfo from './pages/signUpPage/petInfo/PetInfo';
import Login from './pages/signInPage/Login';
import MyStoragePage from './pages/myStorage/MyStoragePage';
import WhereToGoPage from './pages/whereToGo/WhereToGoPage';
import {
  EDITOR_NOTE_PATH,
  ROOT_PATH,
  SIGN_IN_PATH,
  SIGN_UP_PATH,
  MY_STORAGE_PATH,
  WHERE_TO_GO_PATH,
  MY_ACCOUNT_PATH,
  DETAIL_PLACE_PATH,
  REVIEW_WRITING_PATH,
  KAKAO_REDIRECT_HANDLE_PATH,
  NAVER_REDIRECT_HANDLE_PATH,
  RESERVATION_PATH,
} from './common/constants/path.const';
import './App.scss';
import MyAccount from './pages/myAccount/MyAccount';
import FindPassword from './pages/signInPage/password/FindPassword';
import ResetPassword from './pages/signInPage/password/ResetPassword';
import PhoneAuth from './pages/signInPage/phoneAuth/PhoneAuth';
import DetailPlacePage from './pages/detailPlace/DetailPlacePage';
import ReviewsPage from './pages/detailPlace/reviewsPage/ReviewsPage';
import RoomTypePage from './pages/detailPlace/roomTypePage/RoomTypePage';
import Reservation from './pages/reservation/reservationPage/ReservationPage';
import ReviewWritingPage from './pages/reviewWriting/ReviewWritingPage';
import KakaoRedirectHandler from './pages/signInPage/socialLogion/KakaoRedirectHandler';
import NaverRedirectHandler from './pages/signInPage/socialLogion/NaverRedirectHandler';
import AlertConfirmOne from './common/dialog/AlertConfirmOne';
import { errorActions } from './redux/slice/errorSlice';
import { RootState } from './redux/store';
import ReservationConfirmPage from './pages/reservation/reservationConfirmPage/ReservationConfirmPage';
import Coupon from './pages/myAccount/coupon/Coupon';
import ReservationWaitingPage from './pages/reservation/reservationWaitingPage/ReservationWaitingPage';
import Settings from './pages/myAccount/setting/Settings';
import ChangePetInfo from './pages/myAccount/petInfo/ChangePetInfo';
import ReservationCanclePage from './pages/reservation/reservationCanclePage/ReservationCanclePage';
import SignUpComplete from './pages/signUpPage/petInfo/SignUpComplete';
import ReviewList from './pages/myAccount/review/ReviewList';
import ChangeUserInfo from './pages/myAccount/userInfo/ChangeUserInfo';
import ReservationHistoryPage from './pages/reservation/reservationHistoryPage/ReservationHistoryPage';
import ChangePasswordCheck from './pages/myAccount/password/ChangePasswordCheck';
import ChangePassword from './pages/myAccount/password/ChangePassword';
import ServiceTerm from './pages/myAccount/term/ServiceTerm';
import SocialNickname from './pages/signUpPage/forSocial/SocialNickname';
import SocialMiddle from './pages/signUpPage/forSocial/SocialMiddle';
import SocialExist from './pages/signUpPage/forSocial/SocialExist';
import { deviceAction } from './redux/slice/deviceSlice';


declare global{
  interface Window{
    BRIDGE:any
    webkit:any
    Kakao: any
  }
}

function App() {
  const hasError = useSelector((state: RootState) => state.error.hasError);
  const dispatch = useDispatch();
  const queryClient = new QueryClient();
  const location = useLocation();

  useEffect(() => {
    const varUA = navigator.userAgent.toLowerCase();
    if (varUA.indexOf('android') > -1) {
      dispatch(deviceAction.android());
    } else if (varUA.indexOf('iphone') > -1 || varUA.indexOf('ipad') > -1 || varUA.indexOf('ipod') > -1) {
      dispatch(deviceAction.ios());
    }
  }, []);

  const alertButtonHandler = () => {
    dispatch(errorActions.setFine());
  };

  return (
    <QueryClientProvider client={queryClient}>
      {hasError && <AlertConfirmOne text="네트워크를 확인해주세요" buttonHandler={alertButtonHandler} />}
      <Routes location={location}>
        <Route path={ROOT_PATH} element={<HomePage />} />
        <Route path={EDITOR_NOTE_PATH} element={<EditorNote />} />
        <Route path={SIGN_IN_PATH.MAIN} element={<SignInPage />} />
        <Route path={SIGN_IN_PATH.SIGNIN} element={<Login />} />
        <Route path={SIGN_IN_PATH.FINDPASSWORD} element={<FindPassword />} />
        <Route path={SIGN_IN_PATH.PHONEAUTH} element={<PhoneAuth />} />
        <Route path={SIGN_IN_PATH.RESETPASSWORD} element={<ResetPassword />} />
        <Route path={SIGN_UP_PATH.VERIFY} element={<VerifyPhonePage />} />
        <Route path={SIGN_UP_PATH.TERMS} element={<TermsPage />} />
        <Route path={SIGN_UP_PATH.USER_INFO} element={<UserInfo />} />
        <Route path={SIGN_UP_PATH.USER_PET_INFO} element={<PetInfo />} />
        <Route path={SIGN_UP_PATH.USER_PET_INFO} element={<PetInfo />} />
        <Route path={SIGN_UP_PATH.COMPLETE} element={<SignUpComplete />} />
        <Route path={SIGN_UP_PATH.SOCIAL.NICKNAME} element={<SocialNickname />} />
        <Route path={SIGN_UP_PATH.SOCIAL.NO_PHONE} element={<SocialMiddle />} />
        <Route path={SIGN_UP_PATH.SOCIAL.OTHER} element={<SocialExist />} />
        <Route path={MY_STORAGE_PATH} element={<MyStoragePage />} />
        <Route path={WHERE_TO_GO_PATH} element={<WhereToGoPage />} />
        <Route path={MY_ACCOUNT_PATH.MAIN} element={<MyAccount />} />
        <Route path={MY_ACCOUNT_PATH.COUPON} element={<Coupon />} />
        <Route path={MY_ACCOUNT_PATH.SETTINGS} element={<Settings />} />
        <Route path={MY_ACCOUNT_PATH.PETINFO} element={<ChangePetInfo />} />
        <Route path={MY_ACCOUNT_PATH.USERINFO} element={<ChangeUserInfo />} />
        <Route path={MY_ACCOUNT_PATH.REVIEWS} element={<ReviewList />} />
        <Route path={MY_ACCOUNT_PATH.PASSWORDCHECK} element={<ChangePasswordCheck />} />
        <Route path={MY_ACCOUNT_PATH.PASSWORDCHANGE} element={<ChangePassword />} />
        <Route path={MY_ACCOUNT_PATH.TERM1} element={<ServiceTerm id={1} />} />
        <Route path={MY_ACCOUNT_PATH.TERM2} element={<ServiceTerm id={2} />} />
        <Route path={DETAIL_PLACE_PATH.MAIN} element={<DetailPlacePage />} />
        <Route path={DETAIL_PLACE_PATH.REVIEWS} element={<ReviewsPage />} />
        <Route path={DETAIL_PLACE_PATH.ROOMTYPES} element={<RoomTypePage />} />
        <Route path={RESERVATION_PATH.RESERVATION} element={<Reservation />} />
        <Route path={RESERVATION_PATH.RESERVATION_WAITING} element={<ReservationWaitingPage />} />
        <Route path={RESERVATION_PATH.RESERVATION_CONFIRM} element={<ReservationConfirmPage />} />
        <Route path={RESERVATION_PATH.RESERVATION_CANCLE} element={<ReservationCanclePage />} />
        <Route path={RESERVATION_PATH.RESERVATION_HISTORY} element={<ReservationHistoryPage />} />
        <Route path={REVIEW_WRITING_PATH} element={<ReviewWritingPage />} />
        <Route path={KAKAO_REDIRECT_HANDLE_PATH} element={<KakaoRedirectHandler />} />
        <Route path={NAVER_REDIRECT_HANDLE_PATH} element={<NaverRedirectHandler />} />
      </Routes>
    </QueryClientProvider>
  );
}

export default App;
