import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Route, Routes, useLocation } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { TransitionGroup, CSSTransition } from "react-transition-group";
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
  RESERVATION_PATH
} from './constants/path.const';
import './App.scss';
import MyAccount from './pages/myAccount/MyAccount';
import FindPassword from './pages/signInPage/FindPassword';
import ResetPassword from './pages/signInPage/ResetPassword';
import PhoneAuth from './pages/signInPage/PhoneAuth';
import DetailPlacePage from './pages/detailPlace/DetailPlacePage';
import ReviewsPage from './pages/detailPlace/reviewsPage/ReviewsPage';
import RoomTypePage from './pages/detailPlace/roomTypePage/RoomTypePage';
import Reservation from './pages/reservation/reservationPage/ReservationPage';
import ReviewWritingPage from './pages/reviewWriting/ReviewWritingPage';
import KakaoRedirectHandler from './common/socialLogion/KakaoRedirectHandler';
import NaverRedirectHandler from './common/socialLogion/NaverRedirectHandler';
import AlertConfirmOne from './common/dialog/AlertConfirmOne';
import { errorActions } from './redux/slice/errorSlice';
import ReservationConfirmPage from './pages/reservation/reservationConfirmPage/ReservationConfirmPage';
import Coupon from './pages/myAccount/Coupon';
import ReservationWaitingPage from './pages/reservation/reservationWaitingPage/ReservationWaitingPage';
import Settings from './pages/myAccount/Settings';
import ChangePetInfo from './pages/myAccount/ChangePetInfo';
import ReservationCanclePage from './pages/reservation/reservationCanclePage/ReservationCanclePage';
import SignUpComplete from './pages/signUpPage/petInfo/SignUpComplete';
import ReviewList from './pages/myAccount/ReviewList';
import ChangeUserInfo from './pages/myAccount/ChangeUserInfo';
import ReservationHistoryPage from './pages/reservation/reservationHistoryPage/ReservationHistoryPage';
import ChangePasswordCheck from './pages/myAccount/ChangePasswordCheck';
import ChangePassword from './pages/myAccount/ChangePassword';
import ServiceTerm from './pages/myAccount/ServiceTerm';
import SocialNickname from './pages/signUpPage/forSocial/SocialNickname';

function App() {
  const hasError = useSelector((state: any) => state.error.hasError);
  const dispatch = useDispatch();
  const alertButtonHandler = () => {
    dispatch(errorActions.setFine());
  };
  const queryClient = new QueryClient();
  const location = useLocation()

  return (
    <QueryClientProvider client={queryClient}>
      {hasError && <AlertConfirmOne text="네트워크를 확인해주세요" buttonHandler={alertButtonHandler} />}
      {/* <TransitionGroup className="transition-group">
      <CSSTransition exact key={location.pathname.includes('/detail-place')===true ?location.pathname:null} classNames="slide" timeout={200}> */}
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
        <Route path={SIGN_UP_PATH.SOCIAL.NICKNAME} element={<SocialNickname/>}/>
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
        <Route path={MY_ACCOUNT_PATH.TERM1} element={<ServiceTerm id={1}/>} />
        <Route path={MY_ACCOUNT_PATH.TERM2} element={<ServiceTerm id={2}/>} />
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
      {/* </CSSTransition>
   		 </TransitionGroup>  */}
    </QueryClientProvider>
  );
}

export default App;
