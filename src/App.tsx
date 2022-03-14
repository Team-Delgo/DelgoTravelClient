import React from 'react';
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/home/Home";
import EditorNote from "./pages/home/EditorNote";
import SignInPage from "./pages/user/signInPage/SignIn";
import VerifyPhonePage from "./pages/user/signUpPage/VerifyPhone";
import TermsPage from "./pages/user/signUpPage/Terms";


function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/editor-note/:id" element={<EditorNote />} />
      <Route path="/user/signin" element={<SignInPage />} />
      <Route path="/user/signup/verifyphone" element={<VerifyPhonePage />} />
      <Route path="/user/signup/terms" element={<TermsPage />} />
    </Routes>
  );
}

export default App;
