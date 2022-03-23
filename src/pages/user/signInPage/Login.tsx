import React, { useState, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as Arrow } from '../../../icons/left-arrow.svg';

interface Input {
  email: string;
  password: string;
}

function Login() {
  const [enteredInput, setEnteredInput] = useState<Input>({ email: '', password: '' });
  const navigation = useNavigate();

  const inputChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    setEnteredInput((prev: Input) => {
      return { ...prev, [id]: value };
    });
  };

  const submitHandler = () => {
    console.log('login submit!');
  };

  return (
    <div className="login">
      <div aria-hidden="true" className="login-back" onClick={() => navigation(-1)}>
        <Arrow />
      </div>
      <header className="login-header">로그인</header>
      <span className="login-span">이메일</span>
      <div className="login-input-box">
        <input
          className="login-input"
          placeholder="이메일"
          id="email"
          value={enteredInput.email}
          onChange={inputChangeHandler}
        />
      </div>
      <span className="login-span">비밀번호</span>
      <div className="login-input-box">
        <input
          className="login-input"
          placeholder="비밀번호"
          id="password"
          type="password"
          value={enteredInput.password}
          onChange={inputChangeHandler}
        />
      </div>
      <button
        type="button"
        className="login-button active"
        onClick={submitHandler}
      >
        다음
      </button>
    </div>
  );
}

export default Login;
