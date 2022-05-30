import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Route, Routes, useLocation } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import HomePage from './pages/home/Home';
import EditorNote from './pages/editorNote/EditorNote';
import SignInPage from './pages/user/signInPage/SignIn';
import VerifyPhonePage from './pages/user/signUpPage/verifyphone/VerifyPhone';
import TermsPage from './pages/user/signUpPage/terms/Terms';
import UserInfo from './pages/user/signUpPage/userInfo/UserInfo';
import PetInfo from './pages/user/signUpPage/petInfo/PetInfo';
import Login from './pages/user/signInPage/Login';
import WishListPage from './pages/wishList/WishList';
import WhereToGoPage from './pages/whereToGo/WhereToGo';
import {
  EDITOR_NOTE_PATH,
  ROOT_PATH,
  SIGN_IN_PATH,
  SIGN_UP_PATH,
  WISH_LIST_PATH,
  WHERE_TO_GO_PATH,
  MY_ACCOUNT_PATH,
  DETAIL_PLACE_PATH,
  REVIEW_WRITING_PATH,
  KAKAO_REDIRECT_HANDLE_PATH,
  NAVER_REDIRECT_HANDLE_PATH,
} from './constants/path.const';
import './App.scss';
import MyAccount from './pages/myAccount/MyAccount';
import FindPassword from './pages/user/signInPage/FindPassword';
import ResetPassword from './pages/user/signInPage/ResetPassword';
import PhoneAuth from './pages/user/signInPage/PhoneAuth';
import Calender from './pages/calender/Calender';
import DetailPlace from './pages/detailPlace/DetailPlace';
import ReviewsPage from './pages/detailPlace/reviewsPage/ReviewsPage';
import RoomTypePage from './pages/detailPlace/roomTypePage/RoomTypePage';
import Reservation from './pages/detailPlace/reservationPage/Reservation';
import ReviewWritingPage from './pages/riviewWriting/RiviewWriting';
import KakaoRedirectHandler from './common/socialLogion/KakaoRedirectHandler';
import NaverRedirectHandler from './common/socialLogion/NaverRedirectHandler';
import AlertConfirmOne from './common/dialog/AlertConfirmOne';
import { errorActions } from './redux/reducers/errorSlice';
import ReservationConfirmPage from './pages/detailPlace/reservationConfirmPage/ReservationConfirmPage';
import './Transition.scss';

function App() {
  const hasError = useSelector((state: any) => state.error.hasError);
  const dispatch = useDispatch();
  const alertButtonHandler = () => {
    dispatch(errorActions.setFine());
  };
  const queryClient = new QueryClient();
  const location = useLocation();
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
        <Route path={WISH_LIST_PATH} element={<WishListPage />} />
        <Route path={WHERE_TO_GO_PATH} element={<WhereToGoPage />} />
        <Route path={MY_ACCOUNT_PATH} element={<MyAccount />} />
        <Route path={REVIEW_WRITING_PATH} element={<ReviewWritingPage />} />
        <Route path={KAKAO_REDIRECT_HANDLE_PATH} element={<KakaoRedirectHandler />} />
        <Route path={NAVER_REDIRECT_HANDLE_PATH} element={<NaverRedirectHandler />} />
      </Routes>
      <TransitionGroup className="transition-group">
        <CSSTransition
          key={location.pathname}
          classNames="slide"
          timeout={500}
        >
          <Routes location={location}>
            <Route path={DETAIL_PLACE_PATH.MAIN} element={<DetailPlace />} />
            <Route path={DETAIL_PLACE_PATH.REVIEWS} element={<ReviewsPage />} />
            <Route path={DETAIL_PLACE_PATH.ROOMTYPES} element={<RoomTypePage />} />
            <Route path={DETAIL_PLACE_PATH.RESERVATION} element={<Reservation />} />
            <Route path={DETAIL_PLACE_PATH.RESERVATION_CONFIRM} element={<ReservationConfirmPage />} />
          </Routes>
        </CSSTransition>
      </TransitionGroup>
    </QueryClientProvider>
  );
}

export default App;
