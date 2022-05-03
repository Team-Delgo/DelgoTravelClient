import React, { ChangeEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AxiosResponse } from 'axios';
import { ReactComponent as Arrow } from '../../../icons/left-arrow.svg';
import { SIGN_IN_PATH } from '../../../constants/path.const';

interface Input {
  password: string;
  passwordConfirm: string;
}

function ResetPassword() {
  const [enteredInput, setEnteredInput] = useState<Input>({ password: '', passwordConfirm: '' });
  const [feedback, setFeedback] = useState('');
  const navigation = useNavigate();
  const isValid = enteredInput.password.length >= 8 && feedback.length === 0;

  const inputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setEnteredInput((prev: Input) => {
      return { ...prev, [id]: value };
    });
    
    // if(id==='passwordConfirm'){
    // }
  };

  const submitHandler = () => {
    // axios
    navigation(SIGN_IN_PATH.MAIN);
  };

  return (
    <div className="login">
      <div aria-hidden="true" className="login-back" onClick={() => navigation(-1)}>
        <Arrow />
      </div>
      <header className="login-header">새 비밀번호 설정</header>
      <div className="login-description">
        인증이 완료되었습니다.
        <br />
        새로운 비밀번호를 입력해주세요.
      </div>
      <div className="login-input-box">
        <input
          className="login-input"
          placeholder="새 비밀번호 (최소8자 이상)"
          id="password"
          type="password"
          value={enteredInput.password}
          onChange={inputChangeHandler}
        />
      </div>
      <div className="login-input-box">
        <input
          className="login-input"
          placeholder="새 비밀번호 확인"
          id="passwordConfirm"
          type="password"
          value={enteredInput.passwordConfirm}
          onChange={inputChangeHandler}
        />
      </div>
      <button type="button" className="login-button active" onClick={submitHandler}>
        확인
      </button>
    </div>
  );
}

export default ResetPassword;
