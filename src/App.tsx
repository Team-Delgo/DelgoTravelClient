import React from 'react';
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/home/Home";
import EditorNote from "./pages/home/EditorNote";
import SignInPage from "./pages/user/signInPage/SignIn";

import VerifyPhonePage from "./pages/user/signUpPage/verifyphone/VerifyPhone";
import TermsPage from "./pages/user/signUpPage/terms/Terms";
import UserInfo from './pages/user/signUpPage/userInfo/UserInfo';
import PetInfo from './pages/user/signUpPage/petInfo/PetInfo';
import {EDITOR_NOTE_PATH, ROOT_PATH, SIGN_IN_PATH, SIGN_UP_PATH} from "./constants/path.const";
import "./App.scss";



function App() {
  return (
    <Routes>
      <Route path={ROOT_PATH} element={<HomePage />} />
      <Route path={EDITOR_NOTE_PATH} element={<EditorNote />} />
      <Route path={SIGN_IN_PATH} element={<SignInPage />} />
      <Route path={SIGN_UP_PATH.VERIFY} element={<VerifyPhonePage />} />
      <Route path={SIGN_UP_PATH.TERMS} element={<TermsPage />} />
      <Route path={SIGN_UP_PATH.USER_INFO} element={<UserInfo/>} />
      <Route path={SIGN_UP_PATH.USER_PET_INFO} element={<PetInfo/>} />
    </Routes>
  );
}

export default App;
